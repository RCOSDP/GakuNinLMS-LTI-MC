import fs from "fs";
import schedule from "node-schedule";
import jwt from "jsonwebtoken";
import rp from "request-promise";
import dateFormat from "dateformat";
import getUnixTime from "date-fns/getUnixTime";

import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";
import { findUserByEmail } from "$server/utils/user";
import { scpUpload } from "$server/utils/wowza/scpUpload";
import { query } from "$server/utils/wowza/token";

import {
  WOWZA_BASE_URL,
  WOWZA_SECURE_TOKEN,
  WOWZA_QUERY_PREFIX,
  WOWZA_EXPIRES_IN,
  ZOOM_API_KEY,
  ZOOM_API_SECRET,
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

  constructor(userId: string, email: string, createdAt: string) {
    this.userId = userId;
    this.email = email;
    this.createdAt = createdAt;
    this.errors = [];
  }

  async importTopics() {
    try {
      const user = await findUserByEmail(this.email);
      if (!user) return;

      const meetings = await zoomListRequest(
        `/users/${this.userId}/recordings`,
        "meetings",
        { page_size: 300, from: this.fromDate() }
      );
      this.tmpdir = fs.mkdtempSync("/tmp/zoom-import-");
      const uploadroot = fs.mkdtempSync(`${this.tmpdir}/upload-wowza-`);
      const transactions = [];
      for (const meeting of meetings) {
        const data = await this.getTopic(meeting, user, uploadroot);
        if (data) transactions.push(prisma.topic.create({ data }));
      }
      if (this.errors.length) return;

      await scpUpload(uploadroot);
      await prisma.$transaction(transactions);
    } catch (e) {
      this.errors.push(...(Array.isArray(e) ? e : [e.toString()]));
    } finally {
      this.cleanUp();
    }
  }

  async getTopic(meeting: ZoomResponse, user: User, uploadroot: string) {
    const meetingDetail = await this.getMeetingDetail(meeting);

    const recordingFiles: ZoomResponse[] = meeting.recording_files;
    const downloadUrl = recordingFiles.find((file) => file.file_type == "MP4")
      ?.download_url;
    if (!downloadUrl) return;

    const startTime = new Date(meeting.start_time);
    // recursive:true が利かない https://github.com/nodejs/node/issues/27293
    const uploaddomain = fs.mkdirSync(`${uploadroot}/${user.ltiConsumerId}`, {
      recursive: true,
    });
    const uploadauthor = fs.mkdirSync(`${uploaddomain}/${user.id}`, {
      recursive: true,
    });
    const uploaddir = fs.mkdtempSync(
      `${uploadauthor}/${dateFormat(startTime, "yyyymmdd-HHMM")}-`
    );
    const file = `${uploaddir}/${meeting.id}.mp4`;

    const option = {
      uri: `${downloadUrl}?access_token=${zoomRequestToken()}`,
      encoding: null,
    };
    await rp(option)
      .then((response) => {
        fs.writeFileSync(file, Buffer.from(response));
      })
      .catch((error) => {
        this.errors.push(error);
      });

    const video = {
      create: {
        providerUrl: "https://www.wowza.com/",
      },
    };

    const url = await wowzaUrl(file.substring(uploadroot.length));
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
      creator: { connect: { id: user.id } },
      createdAt: startTime,
      updatedAt: new Date(),
      resource,
      details: {},
    };
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

async function wowzaUrl(path: string) {
  const expires: Record<string, string> =
    WOWZA_EXPIRES_IN > 0
      ? {
          endtime: `${getUnixTime(new Date()) + WOWZA_EXPIRES_IN}`,
        }
      : {};
  const contentPath = new URL(path, WOWZA_BASE_URL).pathname.replace(/^\//, "");
  return new URL(
    `/${contentPath}/playlist.m3u8?${query(
      contentPath,
      expires,
      WOWZA_QUERY_PREFIX,
      WOWZA_SECURE_TOKEN,
      "sha512" /* TODO: SHA-512 以外未サポート */
    )}`,
    WOWZA_BASE_URL
  ).href;
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
