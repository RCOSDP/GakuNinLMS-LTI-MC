import { useRouter } from "next/router";
import TopicImport from "$templates/TopicImport.tsx";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/TopicNotFoundProblem";
import { useSessionAtom } from "$store/session";
import { updateBook, useBook } from "$utils/book";
import { useTopics } from "$utils/topics";
import type { TopicSchema } from "$server/models/topic";
import type { Query as BookEditQuery } from "$pages/book/edit";
import { connectOrCreateTopic } from "$utils/topic";
import { pagesPath } from "$utils/$path";

export type Query = BookEditQuery;

function Import({ bookId, context }: BookEditQuery) {
  const { isTopicEditable } = useSessionAtom();
  const book = useBook(bookId);
  const topics = useTopics(isTopicEditable);
  const router = useRouter();
  const bookEditQuery = { bookId, ...(context && { context }) };
  async function handleSubmit(topics: TopicSchema[]) {
    if (!book) return;

    const connectOrCreateTopics = topics.map((topic) => {
      return connectOrCreateTopic(topic, isTopicEditable).then(({ id }) => id);
    });
    const ids = await Promise.all(connectOrCreateTopics);
    await updateBook({
      ...book,
      ltiResourceLinks: undefined,
      sections: [...book.sections, ...ids.map((id) => ({ topics: [{ id }] }))],
    });

    return router.push(
      pagesPath.book.edit.$url({
        query: bookEditQuery,
      })
    );
  }
  function handleCancel() {
    return router.back();
  }
  function handleTopicEditClick({ id: topicId }: Pick<TopicSchema, "id">) {
    return router.push(
      pagesPath.book.topic.import.edit.$url({
        query: { ...bookEditQuery, topicId },
      })
    );
  }
  const handlers = {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onTopicEditClick: handleTopicEditClick,
    isTopicEditable,
  };

  if (!book) return <Placeholder />;
  if (!topics) return <Placeholder />;

  return <TopicImport topics={topics} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<Query, "context"> = router.query;

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Import bookId={bookId} context={context} />;
}

export default Router;
