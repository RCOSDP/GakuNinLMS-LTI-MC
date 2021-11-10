import { stringify as stringifyBase } from "$server/utils/search/parser";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

/**
 * LTI Contextを検索クエリー文字列に変換
 * @param link LTI Context
 * @return 検索クエリー文字列
 */
function stringify(
  link: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
): string {
  return stringifyBase({
    text: [],
    name: [],
    description: [],
    author: [],
    keyword: [],
    license: [],
    link: [link],
  });
}

export default stringify;
