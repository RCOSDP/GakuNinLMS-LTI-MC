import jwt from "jsonwebtoken";
import got from "got";
import type { Method } from "got";

import { ZOOM_API_KEY, ZOOM_API_SECRET } from "$server/utils/env";

export interface ZoomQuery {
  [key: string]: string | number | boolean;
}

// zoom apiのレスポンスデータ全般を扱う型
// apiによって内容は違うが、文字列のキー名と任意の型の値という形式は共通しており
// これらの形式をtypescriptの警告やエラーを回避しつつ利用できるようにするため
// any型を許容する。具体的な利用例は以下の通り
// value = response[keyname];
// next_page_token = response.next_page_token;
export interface ZoomResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function zoomRequestToken() {
  return jwt.sign({}, ZOOM_API_SECRET, {
    issuer: ZOOM_API_KEY,
    expiresIn: "2s",
  });
}

export async function zoomRequest(
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

export async function zoomListRequest(
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
