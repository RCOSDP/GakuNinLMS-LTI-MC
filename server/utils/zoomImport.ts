import fs from "fs";
import schedule from "node-schedule";
import jwt from "jsonwebtoken";
import rp from "request-promise";
import dateFormat from "dateformat";

import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";
import { findUserByEmail } from "$server/utils/user";
import { scpUpload } from "$server/utils/wowza/scpUpload";

import {
  API_BASE_PATH,
  ZOOM_API_KEY,
  ZOOM_API_SECRET,
  ZOOM_IMPORT_WOWZA_BASE_URL,
} from "$server/utils/env";

export async function setupZoomImportScheduler() {
  const job = schedule.scheduleJob("* * * * *", async () => {
    job.cancel();

    const users = await zoomListRequest("/users", "users", { page_size: 300 });
    for (const user of users) {
      await new ZoomImport(user.id, user.email, user.created_at).importTopics();
    }
  });
}

class ZoomImport {
  userId: string;
  email: string;
  createdAt: string;
  errors: string[];
  tmpdir?: string;
  uploadauthor?: string;
  user?: User | null;

  constructor(userId: string, email: string, createdAt: string) {
    this.userId = userId;
    this.email = email;
    this.createdAt = createdAt;
    this.errors = [];
  }

  async importTopics() {
    try {
      this.user = await findUserByEmail(this.email);
      if (!this.user) return;

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
      for (const meeting of meetings) {
        const data = await this.getTopic(meeting);
        if (data) transactions.push(prisma.topic.create({ data }));
      }
      if (!transactions.length) return;

      await scpUpload(this.tmpdir);
      await prisma.$transaction(transactions);
    } catch (e) {
      this.errors.push(...(Array.isArray(e) ? e : [e.toString()]));
    } finally {
      this.cleanUp();
    }
  }

  async getTopic(meeting: ZoomResponse) {
    if (!this.user || !this.tmpdir || !this.uploadauthor) return;

    let uploaddir;
    try {
      const meetingDetail = await this.getMeetingDetail(meeting);

      const recordingFiles: ZoomResponse[] = meeting.recording_files;
      const downloadUrl = recordingFiles.find((file) => file.file_type == "MP4")
        ?.download_url;
      if (!downloadUrl) return;

      const startTime = new Date(meeting.start_time);
      uploaddir = fs.mkdtempSync(
        `${this.uploadauthor}/${dateFormat(startTime, "yyyymmdd-HHMM")}-`
      );
      const file = `${uploaddir}/${meeting.id}.mp4`;

      const option = {
        uri: `${downloadUrl}?access_token=${zoomRequestToken()}`,
        encoding: null,
      };
      await rp(option).then((response) => {
        fs.writeFileSync(file, Buffer.from(response));
      });

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

      return {
        name: "📽 " + meeting.topic,
        description: meetingDetail.agenda,
        timeRequired: meeting.duration,
        creator: { connect: { id: this.user.id } },
        createdAt: startTime,
        updatedAt: new Date(),
        resource,
        details: {},
      };
    } catch (e) {
      this.errors.push(e.toString());
      if (uploaddir) fs.rmdirSync(uploaddir, { recursive: true });
      return;
    }
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
    if (this.errors.length) {
      console.log(this.errors);
    }
  }
}

interface ZoomQuery {
  [key: string]: string | number | boolean;
}

interface ZoomResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function zoomRequestToken() {
  return jwt.sign(
    {
      iss: ZOOM_API_KEY,
      exp: new Date().getTime() + 1000,
    },
    ZOOM_API_SECRET
  );
}

async function zoomRequest(
  path: string,
  qs: ZoomQuery = {}
): Promise<ZoomResponse> {
  const option = {
    uri: "https://api.zoom.us/v2" + path,
    qs,
    auth: { bearer: zoomRequestToken() },
    headers: { "content-type": "application/json" },
    json: true,
  };

  return new Promise((resolve, reject) => {
    rp(option)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
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
