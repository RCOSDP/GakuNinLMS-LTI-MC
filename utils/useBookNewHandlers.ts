import { useCallback } from "react";
import { useRouter } from "next/router";
import { BookProps, BookSchema } from "$server/models/book";
import { pagesPath } from "./$path";
import { createBook } from "./book";

function useBookNewHandlers(
  context: "books" | undefined,
  bookId?: BookSchema["id"]
) {
  const router = useRouter();
  const handleSubmit = useCallback(
    async (book: BookProps) => {
      const { id } = await createBook(book);
      await router.replace(
        pagesPath.book.edit.$url({
          query: {
            bookId: id,
            ...(context && { context }),
          },
        })
      );
    },
    [router, context]
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
  };

  return handlers;
}

export default useBookNewHandlers;
