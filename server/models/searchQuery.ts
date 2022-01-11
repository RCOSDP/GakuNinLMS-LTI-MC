import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

export type SearchQueryBase = {
  /** 検索文字列 (名称 OR 説明 OR 作成者名) */
  text: string[];
  /** 名称 (トピックの場合: トピック名、ブックの場合: ブック名・セクション名・トピック名) */
  name: string[];
  /** 説明 (Markdown) */
  description: string[];
  /** 作成者名 */
  author: string[];
  /** キーワード */
  keyword: string[];
  /** ライセンス (文字列: SPDX License Identifier, 空文字列: 未設定) */
  license: string[];
  /** 共有可否 (true: シェアする, それ以外: シェアしない) */
  shared: boolean[];
  /** トピックの場合: 無効、ブックの場合: 提供されているコース */
  link: Array<Pick<LtiResourceLinkSchema, "consumerId" | "contextId">>;
};

export type TopicSearchQuery = SearchQueryBase & {
  /** コンテンツ種別 (トピックの場合: "topic"、ブックの場合: "book") */
  type: "topic";
};

export type BookSearchQuery = SearchQueryBase & {
  /** コンテンツ種別 (トピックの場合: "topic"、ブックの場合: "book") */
  type: "book";
};

export type SearchQuery = TopicSearchQuery | BookSearchQuery;
