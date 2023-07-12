import { useCallback, useMemo } from "react";
import type { ContentSchema } from "$server/models/content";
import type { BookSchema } from "$server/models/book";
import type { SessionSchema } from "$server/models/session";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { useSessionAtom } from "$store/session";
import { useSearchAtom } from "$store/search";
import {
  destroyLtiResourceLink,
  updateLtiResourceLink,
} from "$utils/ltiResourceLink";
import { revalidateContents } from "./useContents";

/**
 * セッションのltiResourceLinkRequestからltiResourceLinkを作成
 * @param session セッション
 * @return creatorIdとbookIdを除いたLTIリソースリンク
 */
function getLtiResourceLink(
  session?: SessionSchema
): Omit<LtiResourceLinkSchema, "creatorId" | "bookId"> | null {
  if (session == null) return null;
  if (session.ltiResourceLinkRequest?.id == null) return null;

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

function useBookLinkingHandlers() {
  const { session } = useSessionAtom();
  const ltiResourceLink = useMemo(() => getLtiResourceLink(session), [session]);
  const { query } = useSearchAtom();
  const onBookLinking = useCallback(
    async (content: Pick<BookSchema, "id"> | ContentSchema, linking = true) => {
      if ("type" in content && content.type !== "book") return;
      if (ltiResourceLink == null) return;

      if (linking) {
        await updateLtiResourceLink({ ...ltiResourceLink, bookId: content.id });
      } else {
        await destroyLtiResourceLink(ltiResourceLink);
      }

      await revalidateContents(query);
    },
    [ltiResourceLink, query]
  );
  return { onBookLinking };
}

export default useBookLinkingHandlers;
