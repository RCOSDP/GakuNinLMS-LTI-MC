import { useRouter } from "next/router";
import { BookProps, BookSchema } from "$server/models/book";
import BookEdit from "$templates/BookEdit";
import Unknown from "$templates/Unknown";
import { updateBook, useBook } from "$utils/book";

export type Query = {
  id?: string;
  prev?: "/books";
};

function Edit({ id, prev }: Pick<BookSchema, "id"> & Pick<Query, "prev">) {
  const book = useBook(id);
  const router = useRouter();
  async function handleSubmit(props: BookProps) {
    await updateBook({ id, ...props });
    switch (prev) {
      case "/books":
        return router.push(prev);
      default:
        return router.push({ pathname: "/book", query: { id } });
    }
  }
  function handleTopicClick() {
    // TODO: TopicViewer/トピックのプレビュー画面が実装されればそれを表示しましょう
  }

  if (!book) return <p>Loading...</p>; // TODO: プレースホルダーがいい加減

  return (
    <BookEdit
      book={book}
      onSubmit={handleSubmit}
      onTopicClick={handleTopicClick}
    />
  );
}

function Router() {
  const router = useRouter();
  const query: Query = router.query;
  const id = Number(query.id);

  if (!Number.isFinite(id))
    return (
      <Unknown header="ブックがありません">
        ブックが見つかりませんでした
      </Unknown>
    );

  return <Edit id={id} prev={query.prev} />;
}

export default Router;
