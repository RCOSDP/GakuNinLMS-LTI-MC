import { useCallback } from "react";
import type { BookSchema } from "$server/models/book";
import { useSessionAtom } from "$store/session";
import { updateLtiResourceLink } from "$utils/ltiResourceLink";
import getLtiResourceLink from "$utils/getLtiResourceLink";

function useBookLinkHandler() {
  const { session } = useSessionAtom();
  const handler = useCallback(
    async ({ id: bookId }: Pick<BookSchema, "id">) => {
      const ltiResourceLink = getLtiResourceLink(session);
      if (ltiResourceLink == null) return;
      await updateLtiResourceLink({ ...ltiResourceLink, bookId });
    },
    [session]
  );
  return handler;
}

export default useBookLinkHandler;
