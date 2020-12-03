import { User } from "@prisma/client";
import { useSession } from "$utils/session";
import { useUserBooks } from "$utils/userBooks";
import Books from "$templates/Books";

function UserBooks(props: { userId: User["id"] }) {
  const userBooks = useUserBooks(props.userId);
  const books = userBooks.data?.books ?? [];

  return <Books books={books} />;
}

function Index() {
  const session = useSession();
  const userId = session.data?.user?.id;

  if (userId == null) {
    return <Books books={[]} />; // TODO: プレースホルダーがいい加減
  } else {
    return <UserBooks userId={userId} />;
  }
}

export default Index;
