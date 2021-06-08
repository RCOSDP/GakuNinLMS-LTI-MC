import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { useSessionAtom } from "$store/session";
import BooksTemplate from "$templates/Books";
import useBooks from "$utils/useBooks";
import { pagesPath } from "$utils/$path";
import { updateLtiResourceLink } from "$utils/ltiResourceLink";
import getLtiResourceLink from "$utils/getLtiResourceLink";

const Books = (
  props: Omit<
    Parameters<typeof BooksTemplate>[0],
    keyof ReturnType<typeof useBooks>
  >
) => <BooksTemplate {...props} {...useBooks()} />;

function Index() {
  const router = useRouter();
  const { session, isBookEditable, isTopicEditable } = useSessionAtom();
  const handlers = {
    onBookClick({ id }: Pick<BookSchema, "id">) {
      return router.push(pagesPath.book.$url({ query: { bookId: id } }));
    },
    onBookEditClick(book: Pick<BookSchema, "id" | "author">) {
      const action = isBookEditable(book) ? "edit" : "generate";
      return router.push(
        pagesPath.book[action].$url({
          query: { context: "books", bookId: book.id },
        })
      );
    },
    onBookLinkClick: async (book: Pick<BookSchema, "id">) => {
      const ltiResourceLink = getLtiResourceLink(session);
      if (ltiResourceLink == null) return;
      const bookId = book.id;
      await updateLtiResourceLink({ ...ltiResourceLink, bookId });
      return router.push(pagesPath.book.$url({ query: { bookId } }));
    },
    onBookNewClick() {
      return router.push(
        pagesPath.book.new.$url({ query: { context: "books" } })
      );
    },
    onTopicEditClick({ id }: Pick<TopicSchema, "id">) {
      return router.push(
        pagesPath.books.topic.edit.$url({
          query: { topicId: id },
        })
      );
    },
    isTopicEditable,
  };

  return <Books {...handlers} />;
}

export default Index;
