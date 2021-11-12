import { useCallback } from "react";
import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import { pagesPath } from "./$path";
import { createBook } from "./book";
import useBookLinkHandler from "./useBookLinkHandler";

function useBookNewHandlers(
  context: "books" | "topics" | undefined,
  bookId?: BookSchema["id"]
) {
  const router = useRouter();
  const handleBookLink = useBookLinkHandler();
  const handleSubmit = useCallback(
    async ({ submitWithLink, topics, ...book }: BookPropsWithSubmitOptions) => {
      if (topics && topics.length)
        book.sections = getSectionsWithTopics(topics);
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
      case "topics":
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

function getSectionsWithTopics(topics: number[]) {
  const sections = [];
  for (const id of topics) {
    sections.push({ topics: [{ id }] });
  }
  return sections;
}

export default useBookNewHandlers;
