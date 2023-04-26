import { useCallback } from "react";
import type { BookSchema } from "$server/models/book";
import { useSessionAtom } from "$store/session";
import {
  destroyLtiResourceLink,
  updateLtiResourceLink,
} from "$utils/ltiResourceLink";
import getLtiResourceLink from "$utils/getLtiResourceLink";

function useBookLinkHandler() {
  const { session } = useSessionAtom();
  const handler = useCallback(
    async ({ id: bookId }: Pick<BookSchema, "id">, checked: boolean) => {
      const ltiResourceLink = getLtiResourceLink(session);
      if (ltiResourceLink == null) return;
      if (checked) {
        await updateLtiResourceLink({ ...ltiResourceLink, bookId });
      } else {
        await destroyLtiResourceLink(ltiResourceLink);
      }
    },
    [session]
  );
  return handler;
}

export default useBookLinkHandler;
