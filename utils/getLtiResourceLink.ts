import type { SessionSchema } from "$server/models/session";
import type {
  LtiResourceLinkSchema,
  LtiResourceLinkProps,
} from "$server/models/ltiResourceLink";

/**
 * ltiLaunchBodyからltiResourceLinkを作成
 * @param session セッション
 * @return authorIdとbookIdを除いたLTIリソースリンク
 */
function getLtiResourceLink(
  session?: SessionSchema
): Omit<
  LtiResourceLinkSchema & LtiResourceLinkProps,
  "authorId" | "bookId"
> | null {
  const ltiLaunchBody = session?.ltiLaunchBody;
  if (ltiLaunchBody == null) return null;

  const ltiResourceLink = {
    consumerId: ltiLaunchBody.oauth_consumer_key,
    id: ltiLaunchBody.resource_link_id,
    title: ltiLaunchBody.resource_link_title ?? "",
    contextId: ltiLaunchBody.context_id,
    contextTitle: ltiLaunchBody.context_title ?? "",
    contextLabel: ltiLaunchBody.context_label ?? "",
  };

  return ltiResourceLink;
}

export default getLtiResourceLink;
