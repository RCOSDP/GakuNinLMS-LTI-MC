import { useRouter } from "next/router";
import { BookProps } from "$server/models/book";
import BookNew from "$templates/BookNew";
import { createBook } from "$utils/book";

function New() {
  const router = useRouter();
  const handleSubmit = async (book: BookProps) => {
    const { id } = await createBook(book);
    // TODO: ブック編集画面への遷移にあとで(#97)直すべし
    await router.replace({
      pathname: "/book",
      query: { id },
    });
  };

  return <BookNew onSubmit={handleSubmit} />;
}

export default New;
