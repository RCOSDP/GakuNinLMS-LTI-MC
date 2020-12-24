import { useRouter } from "next/router";
import { BookProps, BookSchema } from "$server/models/book";
import BookEdit from "$templates/BookEdit";
import { updateBook, useBook } from "$utils/book";

type Query = {
  id?: string;
};

function Edit({ id }: Pick<BookSchema, "id">) {
  const book = useBook(id);
  async function handleSubmit(props: BookProps) {
    await updateBook({ id, ...props });
  }
  function handleTopicClick() {
    // TODO: どうあるべきなんだっけ? あとでやる
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

  if (!Number.isFinite(id)) return <p>Not Found</p>; // TODO: エラーページを用意

  return <Edit id={id} />;
}

export default Router;
