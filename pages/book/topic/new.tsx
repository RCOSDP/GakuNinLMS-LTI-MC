import { useRouter } from "next/router";
import type { TopicProps } from "$server/models/topic";
import TopicNew from "$templates/TopicNew";
import Placeholder from "$templates/Placeholder";
import Unknown from "$templates/Unknown";
import { updateBook, useBook } from "$utils/book";
import { createTopic } from "$utils/topic";
import type {
  Query as BookEditQuery,
  EditProps as BookEditProps,
} from "../edit";

function New({ bookId, prev }: BookEditProps) {
  const book = useBook(bookId);
  const router = useRouter();
  async function handleSubmit(props: TopicProps) {
    if (!book) return;

    const { id } = await createTopic(props);
    await updateBook({
      ...book,
      ltiResourceLinks: undefined,
      sections: [...book.sections, { name: null, topics: [{ id }] }],
    });
    return router.push({
      pathname: "/book/edit",
      query: { bookId, ...(prev && { prev }) },
    });
  }
  function handleSubtitleSubmit() {
    // TODO: 未実装
  }
  async function handleSubtitleDelete() {
    // TODO: 未実装
  }

  if (!book) return <Placeholder />;

  return (
    <TopicNew
      onSubmit={handleSubmit}
      onSubtitleSubmit={handleSubtitleSubmit}
      onSubtitleDelete={handleSubtitleDelete}
    />
  );
}

function Router() {
  const router = useRouter();
  const query: BookEditQuery = router.query;
  const bookId = Number(query.bookId);

  if (!Number.isFinite(bookId))
    return (
      <Unknown header="ブックがありません">
        ブックが見つかりませんでした
      </Unknown>
    );

  return <New bookId={bookId} prev={query.prev} />;
}

export default Router;
