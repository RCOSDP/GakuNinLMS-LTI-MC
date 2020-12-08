import { useRouter } from "next/router";
import { BookSchema } from "$server/models/book";
import Book from "$templates/Book";
import { useBook } from "$utils/book";

type Query = {
  id?: string;
};

function Show(props: Pick<BookSchema, "id">) {
  const book = useBook(props.id);

  if (!book.data) return <p>Loading...</p>; // TODO: プレースホルダーがいい加減

  return <Book book={book.data} />;
}

function Router() {
  const router = useRouter();
  const query: Query = router.query;
  const id = Number(query.id);

  if (!Number.isFinite(id)) return <p>Not Found</p>; // TODO: エラーページを用意

  return <Show id={id} />;
}

export default Router;
