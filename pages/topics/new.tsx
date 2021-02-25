import { useRouter } from "next/router";
import TopicNew from "$templates/TopicNew";
import Placeholder from "$templates/Placeholder";
import type { Query as BookEditQuery } from "$pages/book/edit";
import { useBook } from "$utils/book";
import useTopicNewHandlers from "$utils/useTopicNewHandlers";

export type Query = Partial<BookEditQuery>;

function New({ context }: Query) {
  const handlers = useTopicNewHandlers(context);

  return <TopicNew {...handlers} />;
}

function NewWithBook({ bookId, context }: BookEditQuery) {
  const { book } = useBook(bookId);
  const handlers = useTopicNewHandlers(context, book);

  if (!book) return <Placeholder />;

  return <TopicNew {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<BookEditQuery, "context"> = router.query;

  if (Number.isFinite(bookId)) {
    return <NewWithBook bookId={bookId} context={context} />;
  }

  return <New context={context} />;
}

export default Router;
