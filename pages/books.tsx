import { User, Book } from "@prisma/client";
import { useRouter } from "$components/router";
import { useSession } from "$utils/session";
import { useUserBooks } from "$utils/userBooks";
import Books from "$templates/Books";

function UserBooks(props: {
  userId: User["id"];
  onBookClick: (book: { id: Book["id"] }) => void;
}) {
  const userBooks = useUserBooks(props.userId);
  const books = userBooks.data?.books ?? [];

  return <Books books={books} onBookClick={props.onBookClick} />;
}

function Index() {
  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user?.id;
  const handleBookClick = (book: { id: Book["id"] }) => {
    router.push({
      pathname: "/book",
      query: { id: book.id },
    });
  };

  if (userId == null) {
    return <Books books={[]} onBookClick={handleBookClick} />; // TODO: プレースホルダーがいい加減
  } else {
    return <UserBooks userId={userId} onBookClick={handleBookClick} />;
  }
}

export default Index;
