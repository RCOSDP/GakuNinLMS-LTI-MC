import { useRouter } from "next/router";
import BookImport from "$templates/BookImport";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/TopicNotFoundProblem";
import { updateBook, useBook } from "$utils/book";
import { useSession } from "$utils/session";
import { useBooks } from "$utils/books";
import type { BookSchema } from "$server/models/book";
import type { SectionSchema } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import type { Query as BookEditQuery } from "../edit";
import { connectOrCreateTopic } from "$utils/topic";
import { pagesPath } from "$utils/$path";

export type Query = BookEditQuery;

function Import({ bookId, context }: Query) {
  const { data: session } = useSession();
  const book = useBook(bookId);
  const books = useBooks(session?.user);
  const router = useRouter();
  const bookEditQuery = { bookId, ...(context && { context }) };
  async function handleSubmit({
    topics,
  }: {
    books: BookSchema[];
    sections: SectionSchema[];
    topics: TopicSchema[];
  }) {
    if (!book) return;

    const connectOrCreateTopics = topics.map(async (topic) => {
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

    return router.push(pagesPath.book.edit.$url({ query: { bookId } }));
  }
  function handleBookEditClick({ id: bookId }: Pick<BookSchema, "id">) {
    return router.push(
      pagesPath.book.edit.$url({
        // NOTE: ブック編集画面は元のブックインポート画面に戻る手段が無いのでマイブック画面に戻る
        query: { bookId, context: "books" },
      })
    );
  }
  function handleTopicEditClick({ id: topicId }: Pick<TopicSchema, "id">) {
    return router.push(
      pagesPath.book.import.topic.edit.$url({
        query: { ...bookEditQuery, topicId },
      })
    );
  }
  const handlers = {
    onSubmit: handleSubmit,
    onBookEditClick: handleBookEditClick,
    onTopicEditClick: handleTopicEditClick,
    isBookEditable: (book: BookSchema) =>
      // NOTE: 自身以外の作成したブックに関しては編集不可
      session?.user && book.author.id === session.user.id,
    isTopicEditable: (topic: TopicSchema) =>
      // NOTE: 自身以外の作成したトピックに関しては編集不可
      session?.user && topic.creator.id === session.user.id,
  };

  if (!book) return <Placeholder />;
  if (!books) return <Placeholder />;

  return <BookImport books={books} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<Query, "context"> = router.query;

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Import bookId={bookId} context={context} />;
}

export default Router;
