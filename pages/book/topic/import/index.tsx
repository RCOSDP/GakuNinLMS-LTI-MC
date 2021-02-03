import { useRouter } from "next/router";
import TopicImport from "$templates/TopicImport.tsx";
import Placeholder from "$templates/Placeholder";
import Unknown from "$templates/Unknown";
import { updateBook, useBook } from "$utils/book";
import { useSession } from "$utils/session";
import { useTopics } from "$utils/topics";
import type { TopicSchema } from "$server/models/topic";
import type { Query as BookEditQuery } from "$pages/book/edit";
import { connectOrCreateTopic } from "$utils/topic";
import { pagesPath } from "$utils/$path";

export type Query = BookEditQuery;

function Import({ bookId, context }: BookEditQuery) {
  const { data: session } = useSession();
  const book = useBook(bookId);
  const topics = useTopics(session?.user);
  const router = useRouter();
  const bookEditQuery = { bookId, ...(context && { context }) };
  async function handleSubmit(topics: TopicSchema[]) {
    if (!book) return;

    const connectOrCreateTopics = topics.map((topic) => {
      if (!session?.user) return Promise.reject();
      // NOTE: 自身以外の作成したトピックに関しては影響を及ぼすのを避ける目的で複製
      return connectOrCreateTopic(session.user, topic).then(({ id }) => id);
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
  function handleTopicEditClick({ id: topicId }: Pick<TopicSchema, "id">) {
    return router.push(
      pagesPath.book.topic.import.edit.$url({
        query: { ...bookEditQuery, topicId },
      })
    );
  }
  const handlers = {
    onSubmit: handleSubmit,
    onTopicEditClick: handleTopicEditClick,
    isTopicEditable: (topic: TopicSchema) =>
      // NOTE: 自身以外の作成したトピックに関しては編集不可
      session?.user && topic.creator.id === session.user.id,
  };

  if (!book) return <Placeholder />;
  if (!topics) return <Placeholder />;

  return <TopicImport topics={topics} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<Query, "context"> = router.query;

  if (!Number.isFinite(bookId))
    return (
      <Unknown header="ブックがありません">
        ブックが見つかりませんでした
      </Unknown>
    );

  return <Import bookId={bookId} context={context} />;
}

export default Router;
