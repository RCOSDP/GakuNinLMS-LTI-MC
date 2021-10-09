import fs from "fs";
import schedule from "node-schedule";
import jwt from "jsonwebtoken";
import got from "got";
import type { Method } from "got";
import format from "date-fns/format";
import utcToZoneTime from "date-fns-tz/utcToZonedTime";

import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";
import type { UserSettings } from "$server/validators/userSettings";
import { findUserByEmailAndLtiConsumerId } from "$server/utils/user";
import { findZoomMeeting } from "$server/utils/zoomMeeting/findZoomMeeting";
import { scpUpload } from "$server/utils/wowza/scpUpload";

import {
  API_BASE_PATH,
  ZOOM_API_KEY,
  ZOOM_API_SECRET,
  ZOOM_IMPORT_CONSUMER_KEY,
  ZOOM_IMPORT_INTERVAL,
  ZOOM_IMPORT_TO,
  ZOOM_IMPORT_WOWZA_BASE_URL,
  ZOOM_IMPORT_AUTODELETE,
} from "$server/utils/env";

export async function setupZoomImportScheduler() {
  if (
    !ZOOM_API_KEY ||
    !ZOOM_API_SECRET ||
    !ZOOM_IMPORT_CONSUMER_KEY ||
    !ZOOM_IMPORT_INTERVAL ||
    !ZOOM_IMPORT_TO
  ) {
    logger(
      "INFO",
      `zoom import is not disabled. ZOOM_API_KEY:${ZOOM_API_KEY} ZOOM_API_SECRET:${ZOOM_API_SECRET} ZOOM_IMPORT_CONSUMER_KEY:${ZOOM_IMPORT_CONSUMER_KEY} ZOOM_IMPORT_INTERVAL:${ZOOM_IMPORT_INTERVAL} ZOOM_IMPORT_TO:${ZOOM_IMPORT_TO}`
    );
    return;
  }
  if (ZOOM_IMPORT_TO == "wowza" && !ZOOM_IMPORT_WOWZA_BASE_URL) {
    logger(
      "INFO",
      `zoom import is not disabled. ZOOM_IMPORT_WOWZA_BASE_URL is not defined.`
    );
    return;
  }

  const job = schedule.scheduleJob(ZOOM_IMPORT_INTERVAL, async () => {
    job.cancel();
    logger("INFO", "begin zoom import...");

    try {
      const users = await zoomListRequest("/users", "users", {
        page_size: 300,
      });
      for (const user of users) {
        await new ZoomImport(
          user.id,
          user.email,
          user.created_at
        ).importTopics();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      logger("ERROR", e.toString(), e);
    } finally {
      logger("INFO", "end zoom import...");
      job.reschedule(ZOOM_IMPORT_INTERVAL);
    }
  });
}

class ZoomImport {
  userId: string;
  email: string;
  createdAt: string;
  tmpdir?: string;
  uploadauthor?: string;
  user?: User | null;

  constructor(userId: string, email: string, createdAt: string) {
    this.userId = userId;
    this.email = email;
    this.createdAt = createdAt;
  }

  async importTopics() {
    try {
      this.user = await findUserByEmailAndLtiConsumerId(
        this.email,
        ZOOM_IMPORT_CONSUMER_KEY
      );
      if (!this.user) return;
      const settings = this.user.settings as UserSettings;
      if (!settings?.zoom_import?.enabled) return;

      this.tmpdir = fs.mkdtempSync("/tmp/zoom-import-");
      // recursive:true が利かない https://github.com/nodejs/node/issues/27293
      const uploaddomain = fs.mkdirSync(
        `${this.tmpdir}/${this.user.ltiConsumerId}`,
        { recursive: true }
      );
      this.uploadauthor = fs.mkdirSync(`${uploaddomain}/${this.user.id}`, {
        recursive: true,
      });

      const meetings = await zoomListRequest(
        `/users/${this.userId}/recordings`,
        "meetings",
        { page_size: 300, from: this.fromDate() }
      );
      meetings.sort((a, b) => a.start_time.localeCompare(b.start_time));

      const transactions = [];
      const deletemeetings = [];
      for (const meeting of meetings) {
        const data = await this.getTopic(meeting);
        if (data && data.topic && data.zoomMeeting) {
          transactions.push(prisma.topic.create({ data: data.topic }));
          transactions.push(
            prisma.zoomMeeting.create({ data: data.zoomMeeting })
          );
          if (ZOOM_IMPORT_AUTODELETE) deletemeetings.push(meeting.uuid);
        }
      }
      if (!transactions.length) return;

      await scpUpload(this.tmpdir);
      await prisma.$transaction(transactions);
      for (const deletemeeting of deletemeetings) {
        await zoomRequest(
          `/meetings/${deletemeeting}/recordings`,
          { action: "trash" },
          "DELETE"
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      logger("ERROR", `${e.toString()}: email:${this.email}`, e);
    } finally {
      this.cleanUp();
    }
  }

  async getTopic(meeting: ZoomResponse) {
    if (!this.user || !this.tmpdir || !this.uploadauthor) return;

    let uploaddir;
    try {
      const importedResource = await findZoomMeeting(meeting.uuid);
      if (importedResource) return;

      const downloadUrl = this.getDownloadUrl(meeting);
      if (!downloadUrl) return;

      const startTime = new Date(meeting.start_time);
      uploaddir = fs.mkdtempSync(
        `${this.uploadauthor}/${format(
          utcToZoneTime(startTime, meeting.timezone || "Asia/Tokyo"),
          "yyyyMMdd-HHmm"
        )}-`
      );
      const file = `${uploaddir}/${meeting.uuid}.mp4`;

      const responsePromise = got(
        `${downloadUrl}?access_token=${zoomRequestToken()}`
      );
      fs.writeFileSync(file, await responsePromise.buffer());

      const video = {
        create: {
          providerUrl: "https://www.wowza.com/",
        },
      };

      const url = `${ZOOM_IMPORT_WOWZA_BASE_URL}${API_BASE_PATH}/wowza${file.substring(
        this.tmpdir.length
      )}`;
      const resource = {
        connectOrCreate: {
          create: {
            video,
            url,
            details: {},
          },
          where: { url },
        },
      };

      const meetingDetail = await this.getMeetingDetail(meeting);
      const topic = {
        name: "📽 " + meeting.topic,
        description: meetingDetail.agenda,
        timeRequired: meeting.duration * 60,
        creator: { connect: { id: this.user.id } },
        createdAt: startTime,
        updatedAt: new Date(),
        resource,
        details: {},
      };

      const zoomMeeting = {
        uuid: meeting.uuid,
        resource,
      };

      return { topic, zoomMeeting };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      logger(
        "ERROR",
        `${e.toString()}: email:${this.email} meeting.uuid:${meeting.uuid}`,
        e
      );
      if (uploaddir) fs.rmdirSync(uploaddir, { recursive: true });
      return;
    }
  }

  getDownloadUrl(meeting: ZoomResponse) {
    const recordingFiles: ZoomResponse[] = meeting.recording_files;
    return (
      recordingFiles.find(
        (file) =>
          file.file_type == "MP4" &&
          file.recording_type == "shared_screen_with_speaker_view(CC)"
      ) ||
      recordingFiles.find(
        (file) =>
          file.file_type == "MP4" &&
          file.recording_type == "shared_screen_with_speaker_view"
      ) ||
      recordingFiles.find(
        (file) =>
          file.file_type == "MP4" && file.recording_type == "speaker_view"
      ) ||
      recordingFiles.find(
        (file) =>
          file.file_type == "MP4" &&
          file.recording_type == "shared_screen_with_gallery_view"
      ) ||
      recordingFiles.find(
        (file) =>
          file.file_type == "MP4" && file.recording_type == "gallery_view"
      ) ||
      recordingFiles.find(
        (file) =>
          file.file_type == "MP4" && file.recording_type == "shared_screen"
      )
    )?.download_url;
  }

  async getMeetingDetail(meeting: ZoomResponse) {
    try {
      return await zoomRequest(`/meetings/${meeting.id}`);
    } catch (e) {
      return { agenda: "" };
    }
  }

  fromDate() {
    const date = new Date(this.createdAt);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  cleanUp() {
    if (this.tmpdir) {
      fs.rmdirSync(this.tmpdir, { recursive: true });
    }
  }
}

interface ZoomQuery {
  [key: string]: string | number | boolean;
}

// zoom apiのレスポンスデータ全般を扱う型
// apiによって内容は違うが、文字列のキー名と任意の型の値という形式は共通しており
// これらの形式をtypescriptの警告やエラーを回避しつつ利用できるようにするため
// any型を許容する。具体的な利用例は以下の通り
// value = response[keyname];
// next_page_token = response.next_page_token;
interface ZoomResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function zoomRequestToken() {
  return jwt.sign({}, ZOOM_API_SECRET, {
    issuer: ZOOM_API_KEY,
    expiresIn: "2s",
  });
}

async function zoomRequest(
  path: string,
  searchParams: ZoomQuery = {},
  method: Method = "GET"
): Promise<ZoomResponse> {
  return await got("https://api.zoom.us/v2" + path, {
    searchParams,
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${zoomRequestToken()}`,
    },
  }).json();
}

async function zoomListRequest(
  path: string,
  listName: string,
  qs: ZoomQuery = {}
): Promise<ZoomResponse[]> {
  let next_page_token = "";
  const list: ZoomResponse[] = [];
  do {
    const response = await zoomRequest(
      path,
      next_page_token ? Object.assign(qs, { next_page_token }) : qs
    );
    list.push(...response[listName]);
    next_page_token = response.next_page_token;
  } while (next_page_token);
  return list;
}

function logger(level: string, output: string, error?: Error | unknown) {
  console.log(
    format(utcToZoneTime(new Date(), "Asia/Tokyo"), "yyyy-MM-dd HH:mm:ss"),
    level,
    output,
    "ZoomImportLog"
  );
  if (error instanceof Error) console.log(error.stack);
}
