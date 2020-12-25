import { useRouter } from "next/router";
import { BookSchema } from "$server/models/book";
import { useNextItemIndexAtom } from "$store/book";
import Book from "$templates/Book";
import Unknown from "$templates/Unknown";
import { useBook } from "$utils/book";

export type Query = {
  id?: string;
};

function Show(props: Pick<BookSchema, "id">) {
  const book = useBook(props.id);
  const [index, nextItemIndex] = useNextItemIndexAtom();
  const handleTopicEnded = () => nextItemIndex();
  const handleItemClick = nextItemIndex;
  const router = useRouter();
  const handleBookEditClick = () => {
    router.push({ pathname: "/book/edit", query: props });
  };

  if (!book) return <p>Loading...</p>; // TODO: プレースホルダーがいい加減

  return (
    <Book
      book={book}
      index={index}
      onBookEditClick={handleBookEditClick}
      onTopicEnded={handleTopicEnded}
      onItemClick={handleItemClick}
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

  return <Show id={id} />;
}

export default Router;
