import { useRouter } from "next/router";
import { BookProps, BookSchema } from "$server/models/book";
import BookEdit from "$templates/BookEdit";
import Placeholder from "$templates/Placeholder";
import Unknown from "$templates/Unknown";
import { destroyBook, updateBook, useBook } from "$utils/book";

export type Query = {
  id?: string;
  prev?: "/books";
};

export type EditProps = Pick<BookSchema, "id"> & Pick<Query, "prev">;

function Edit({ id, prev }: EditProps) {
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
  async function handleDelete({ id }: Pick<BookSchema, "id">) {
    await destroyBook(id);
    return router.push("/books");
  }
  const handlers = {
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onTopicNewClick: () =>
      router.push({
        pathname: "/book/topic/new",
        query: { id, prev },
      }),
  };
  if (!book) return <Placeholder />;

  return <BookEdit book={book} {...handlers} />;
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
