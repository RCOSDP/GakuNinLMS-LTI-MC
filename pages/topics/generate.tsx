import { useRouter } from "next/router";
import { TopicSchema } from "$server/models/topic";
import TopicNew from "$templates/TopicNew";
import Placeholder from "$templates/Placeholder";
import TopicNotFoundProblem from "$organisms/TopicNotFoundProblem";
import BookNotFoundProblem from "$organisms/BookNotFoundProblem";
import type { Query as BookEditQuery } from "$pages/book/edit";
import { useBook } from "$utils/book";
import { useTopic } from "$utils/topic";
import useTopicNewHandlers from "$utils/useTopicNewHandlers";

export type Query = { topicId: TopicSchema["id"] } & BookEditQuery;

function Generate({ topicId, bookId, context }: Query) {
  const topic = useTopic(topicId);
  const { book } = useBook(bookId);
  const handlers = useTopicNewHandlers(context, book, topic);

  if (!topic) return <Placeholder />;
  if (!book) return <Placeholder />;

  return <TopicNew topic={topic} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const topicId = Number(router.query.topicId);
  const bookId = Number(router.query.bookId);
  const { context }: Pick<BookEditQuery, "context"> = router.query;

  if (!Number.isFinite(topicId)) return <TopicNotFoundProblem />;
  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Generate topicId={topicId} bookId={bookId} context={context} />;
}

export default Router;
