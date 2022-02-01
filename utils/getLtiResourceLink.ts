import type { SessionSchema } from "$server/models/session";
import type {
  LtiResourceLinkSchema,
  LtiResourceLinkProps,
} from "$server/models/ltiResourceLink";

/**
 * セッションからltiResourceLinkを作成
 * @param session セッション
 * @return creatorIdとbookIdを除いたLTIリソースリンク
 */
function getLtiResourceLink(
  session?: SessionSchema
): Omit<
  LtiResourceLinkSchema & LtiResourceLinkProps,
  "creatorId" | "bookId"
> | null {
  if (session == null) return null;

  const ltiResourceLink = {
    consumerId: session.oauthClient.id,
    id: session.ltiResourceLinkRequest.id,
    title: session.ltiResourceLinkRequest.title ?? "",
    contextId: session.ltiContext.id,
    contextTitle: session.ltiContext.title ?? "",
    contextLabel: session.ltiContext.label ?? "",
  };

  return ltiResourceLink;
}

export default getLtiResourceLink;
