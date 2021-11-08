import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

/**
 * LTI Contextを検索クエリー文字列に変換
 * @todo $server/utils/search/parser.ts を使う
 * @param link LTI Context
 * @return 検索クエリー文字列
 */
function stringify(
  link: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
): string {
  const [consumerId, contextId] = [link.consumerId, link.contextId].map(
    encodeURIComponent
  );
  return `link:${consumerId}:${contextId}`;
}

export default stringify;
