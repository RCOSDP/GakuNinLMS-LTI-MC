import * as base from "search-query-parser";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { SearchQueryBase } from "./query";

const options = {
  keywords: [
    "name" as const,
    "description" as const,
    "author" as const,
    "keyword" as const,
    "license" as const,
    "link" as const,
  ],
  alwaysArray: true,
  tokenize: true,
};

type SearchParserResult = base.SearchParserResult &
  {
    // NOTE: keywords and `{ alwaysArray: true }`
    [K in typeof options["keywords"][number]]?: string[];
  } & {
    // NOTE: `{ tokenize: true }`
    text?: string[];
  };

/**
 * 検索クエリー文字列 `link:` キーワードのパース
 * @param input `link:` 以降の文字列
 * @return LtiResourceLink に関する情報
 */
function parseLink(
  input: string
): Array<Pick<LtiResourceLinkSchema, "consumerId" | "contextId">> {
  const token = ":";
  if (!input.includes(token)) return [];
  const [consumerId, contextId] = input.split(token).map(decodeURIComponent);
  return [{ consumerId, contextId }];
}

export function parse(query: string): SearchQueryBase {
  const res = base.parse(query, options) as SearchParserResult;
  return {
    text: res.text ?? [],
    name: res.name ?? [],
    description: res.description ?? [],
    author: res.author ?? [],
    keyword: res.keyword ?? [],
    license: res.license ?? [],
    link: res.link?.flatMap(parseLink) ?? [],
  };
}

/**
 * LTI Contextを検索クエリー文字列に変換
 * @param link LTI Context
 * @return 検索クエリー文字列
 */
function stringifyLink(
  link: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
): string {
  const token = [link.consumerId, link.contextId]
    .map(encodeURIComponent)
    .join(":");
  return token;
}

export function stringify(query: SearchQueryBase): string {
  const { link, ...rest } = query;
  const token = link?.map(stringifyLink).join();
  return base.stringify({ ...rest, link: token }, options);
}
