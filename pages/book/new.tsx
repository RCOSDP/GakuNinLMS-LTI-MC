import { useRouter } from "next/router";
import BookNew from "$templates/BookNew";
import useBookNewHandlers from "$utils/useBookNewHandlers";

export type Query = { context?: "books" | "link" };

function New({ context }: Query) {
  const handlers = useBookNewHandlers(context);

  return <BookNew {...handlers} />;
}

function Router() {
  const router = useRouter();
  const { context }: Pick<Query, "context"> = router.query;

  return <New context={context} />;
}

export default Router;
