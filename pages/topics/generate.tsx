import { useRouter } from "next/router";
import type { TopicSchema } from "$server/models/topic";
import TopicNew from "$templates/TopicNew";
import Placeholder from "$templates/Placeholder";
import TopicNotFoundProblem from "$templates/TopicNotFoundProblem";
import BookNotFoundProblem from "$templates/BookNotFoundProblem";
import type { Query as BookEditQuery } from "$pages/book/edit";
import { useSessionAtom } from "$store/session";
import { useBook } from "$utils/book";
import { useTopic } from "$utils/topic";
import useTopicNewHandlers from "$utils/useTopicNewHandlers";

export type Query = { topicId: TopicSchema["id"] } & Partial<BookEditQuery>;

function Generate({ topicId }: Pick<Query, "topicId">) {
  const topic = useTopic(topicId);
  const handlers = useTopicNewHandlers(undefined, undefined, topic);

  if (!topic) return <Placeholder />;

  return <TopicNew topic={topic} {...handlers} />;
}

function GenerateWithBook({ topicId, bookId, context }: Query & BookEditQuery) {
  const topic = useTopic(topicId);
  const { isContentEditable } = useSessionAtom();
  const { book, error } = useBook(bookId, isContentEditable);
  const handlers = useTopicNewHandlers(context, book, topic);

  if (error) return <BookNotFoundProblem />;
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

  if (Number.isFinite(bookId)) {
    return (
      <GenerateWithBook topicId={topicId} bookId={bookId} context={context} />
    );
  }

  return <Generate topicId={topicId} />;
}

export default Router;
