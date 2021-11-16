import { useRouter } from "next/router";
import BookNew from "$templates/BookNew";
import useBookNewHandlers from "$utils/useBookNewHandlers";

export type Query = {
  context?: "books" | "topics";
  topics?: number | number[];
};

function New({ context, topics }: Query) {
  const handlers = useBookNewHandlers(context);

  return <BookNew {...handlers} topics={getTopicsIdArray(topics)} />;
}

function Router() {
  const router = useRouter();
  const { context, topics }: Pick<Query, "context" | "topics"> = router.query;

  return <New context={context} topics={topics} />;
}

function getTopicsIdArray(topics: Query["topics"]): undefined | number[] {
  if (topics == null) return undefined;
  if (Array.isArray(topics)) return topics;
  return [Number(topics)];
}

export default Router;
