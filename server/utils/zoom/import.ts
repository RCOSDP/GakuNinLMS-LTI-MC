import fs from "fs";
import got from "got";
import format from "date-fns/format";
import utcToZoneTime from "date-fns-tz/utcToZonedTime";

import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";
import type { UserSettingsProp } from "$server/validators/userSettings";
import { findUserByEmailAndLtiConsumerId } from "$server/utils/user";
import { scpUpload } from "$server/utils/wowza/scpUpload";
import { findZoomMeeting } from "$server/utils/zoom/findZoomMeeting";
import {
  API_BASE_PATH,
  ZOOM_IMPORT_CONSUMER_KEY,
  ZOOM_IMPORT_WOWZA_BASE_URL,
  ZOOM_IMPORT_AUTODELETE,
} from "$server/utils/env";

import {
  ZoomResponse,
  zoomRequestToken,
  zoomRequest,
  zoomListRequest,
} from "$server/utils/zoom/api";
import { logger } from "$server/utils/zoom/env";

export async function zoomImport() {
  const users = await zoomListRequest("/users", "users", { page_size: 300 });
  for (const user of users) {
    await new ZoomImport(user.id, user.email, user.created_at).importTopics();
  }
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
      const settings = this.user.settings as UserSettingsProp;
      if (!settings?.zoomImportEnabled) return;

      this.tmpdir = await fs.promises.mkdtemp("/tmp/zoom-import-");
      // recursive:true が利かない https://github.com/nodejs/node/issues/27293
      const uploaddomain = await fs.promises.mkdir(
        `${this.tmpdir}/${this.user.ltiConsumerId}`,
        { recursive: true }
      );
      this.uploadauthor = await fs.promises.mkdir(
        `${uploaddomain}/${this.user.id}`,
        {
          recursive: true,
        }
      );

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
      await this.cleanUp();
    }
  }

  async getTopic(meeting: ZoomResponse) {
    if (!this.user || !this.tmpdir || !this.uploadauthor) return;

    let uploaddir;
    try {
      const importedResource = await findZoomMeeting(meeting.uuid);
      if (importedResource) return;

      const { downloadUrl, fileId } = this.getDownloadUrl(meeting);
      if (!downloadUrl || !fileId) return;

      const startTime = new Date(meeting.start_time);
      uploaddir = await fs.promises.mkdtemp(
        `${this.uploadauthor}/${format(
          utcToZoneTime(startTime, meeting.timezone || "Asia/Tokyo"),
          "yyyyMMdd-HHmm"
        )}-`
      );
      const file = `${uploaddir}/${fileId}.mp4`;

      const responsePromise = got(
        `${downloadUrl}?access_token=${zoomRequestToken()}`
      );
      await fs.promises.writeFile(file, await responsePromise.buffer());

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

      const datetimeForTitle = format(
        utcToZoneTime(startTime, meeting.timezone || "Asia/Tokyo"),
        "yyyy/MM/dd HH:mm"
      );
      const meetingDetail = await this.getMeetingDetail(meeting);
      const topic = {
        name: `📽 ${meeting.topic} ${datetimeForTitle}`,
        description: meetingDetail.agenda,
        timeRequired: meeting.duration * 60,
        creator: { connect: { id: this.user.id } },
        createdAt: startTime,
        updatedAt: new Date(),
        shared: false,
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
      if (uploaddir) await fs.promises.rmdir(uploaddir, { recursive: true });
      return;
    }
  }

  getDownloadUrl(meeting: ZoomResponse) {
    const recordingFiles: ZoomResponse[] = meeting.recording_files;
    const file =
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
      );
    return { downloadUrl: file?.download_url, fileId: file?.id };
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

  async cleanUp() {
    if (this.tmpdir) {
      await fs.promises.rmdir(this.tmpdir, { recursive: true });
    }
  }
}
