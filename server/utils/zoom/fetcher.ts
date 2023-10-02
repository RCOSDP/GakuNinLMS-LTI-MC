import { Readable } from "node:stream";
import { fetch, type Response } from "undici";

export type Request = {
  /** リクエストメソッド */
  method?: string;
  /** URL */
  url: string;
  /** URL query */
  searchParams?: Record<string, string>;
  /** Bearerトークン */
  token?: string;
};

/**
 * HTTPリクエスト
 * @param req リクエスト
 * @returns Response
 */
async function fetcher(req: Request): Promise<Response> {
  const url = req.url
    .concat(`?${new URLSearchParams(req.searchParams)}`)
    .replace(/\?$/, "");

  const res = await fetch(url, {
    method: req.method,
    headers: req.token ? { authorization: `Bearer ${req.token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`, { cause: res });
  }

  return res;
}

/**
 * JSONの取得
 * @param req リクエスト
 * @returns object
 */
export async function jsonFetcher<Data>(req: Request): Promise<Data> {
  const res = await fetcher(req);

  return (await res.json()) as Data;
}

/**
 * Readable streamの取得
 * @param req リクエスト
 * @returns Readable stream
 */
export async function streamFetcher(req: Request): Promise<Readable> {
  const res = await fetcher(req);

  if (res.body == null) {
    return Readable.from([]);
  }

  return Readable.fromWeb(res.body);
}
