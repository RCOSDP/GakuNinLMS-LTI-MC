import { useCallback } from "react";
import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import { pagesPath } from "./$path";
import { createBook } from "./book";
import useBookLinkHandler from "./useBookLinkHandler";
import useAuthorsHandler from "$utils/useAuthorsHandler";
import { updateBookAuthors } from "./bookAuthors";

function useBookNewHandlers(
  context: "books" | "topics" | "courses" | undefined,
  bookId?: BookSchema["id"]
) {
  const router = useRouter();
  const handleBookLink = useBookLinkHandler();
  const { handleAuthorsUpdate, handleAuthorSubmit } = useAuthorsHandler();
  const handleSubmit = useCallback(
    async ({
      authors,
      submitWithLink,
      topics,
      ...props
    }: BookPropsWithSubmitOptions) => {
      if (topics && topics.length)
        props.sections = getSectionsWithTopics(topics);
      const book = await createBook(props);
      await updateBookAuthors({
        id: book.id,
        authors: [
          ...book.authors.map(({ id, roleName }) => ({ id, roleName })),
          ...authors,
        ],
      });
      if (submitWithLink) await handleBookLink({ id: book.id }, true);
      await router.replace(
        pagesPath.book.edit.$url({
          query: {
            bookId: book.id,
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
    onAuthorsUpdate: handleAuthorsUpdate,
    onAuthorSubmit: handleAuthorSubmit,
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
