import * as base from "search-query-parser";
import type { LinkSearchQuery } from "$server/models/link/searchQuery";

const options = {
  keywords: [
    "link" as const,
    "linkTitle" as const,
    "bookName" as const,
    "topicName" as const,
  ],
  alwaysArray: true,
  tokenize: true,
};

type SearchParserResult = base.SearchParserResult & {
  // NOTE: keywords and `{ alwaysArray: true }`
  [K in (typeof options)["keywords"][number]]?: string[];
} & {
  // NOTE: `{ tokenize: true }`
  text?: string[];
};

export function parse(query: string): LinkSearchQuery {
  const res = base.parse(query, options) as SearchParserResult;
  return {
    type: "link",
    text: res.text ?? [],
    oauthClientId: res.link?.map(decodeURIComponent) ?? [],
    linkTitle: res.linkTitle ?? [],
    bookName: res.bookName ?? [],
    topicName: res.topicName ?? [],
  };
}

export function stringify(query: LinkSearchQuery): string {
  const { type: _, oauthClientId, ...rest } = query;
  const token = {
    link: oauthClientId.map(encodeURIComponent).join(),
  };
  return base.stringify({ ...rest, ...token }, options);
}
