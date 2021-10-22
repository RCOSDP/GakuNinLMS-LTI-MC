import { useCallback } from "react";
import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import { pagesPath } from "./$path";
import { createBook } from "./book";
import useBookLinkHandler from "./useBookLinkHandler";
import useAuthorsHandler from "$utils/useAuthorsHandler";

function useBookNewHandlers(
  context: "books" | undefined,
  bookId?: BookSchema["id"]
) {
  const router = useRouter();
  const handleBookLink = useBookLinkHandler();
  const { handleAuthorsUpdate, handleAuthorSubmit } = useAuthorsHandler();
  const handleSubmit = useCallback(
    async ({ submitWithLink, ...book }: BookPropsWithSubmitOptions) => {
      const { id } = await createBook(book);
      if (submitWithLink) await handleBookLink({ id });
      await router.replace(
        pagesPath.book.edit.$url({
          query: {
            bookId: id,
            ...(context && { context }),
          },
        })
      );
    },
    [router, context, handleBookLink]
  );
  const handleCancel = useCallback(() => {
    switch (context) {
      case "books":
        return router.push(pagesPath[context].$url());
      default:
        return router.push(
          bookId
            ? pagesPath.book.$url({ query: { bookId } })
            : pagesPath.books.$url()
        );
    }
  }, [router, context, bookId]);
  const handlers = {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onAuthorsUpdate: handleAuthorsUpdate,
    onAuthorSubmit: handleAuthorSubmit,
  };

  return handlers;
}

export default useBookNewHandlers;
