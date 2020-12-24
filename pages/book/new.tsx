import { useRouter } from "next/router";
import { BookProps } from "$server/models/book";
import BookNew from "$templates/BookNew";
import { createBook } from "$utils/book";

function New() {
  const router = useRouter();
  const handleSubmit = async (book: BookProps) => {
    const { id } = await createBook(book);
    await router.replace({
      pathname: "/book/edit",
      query: { id },
    });
  };

  return <BookNew onSubmit={handleSubmit} />;
}

export default New;
