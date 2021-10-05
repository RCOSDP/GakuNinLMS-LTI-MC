import { useRouter } from "next/router";
import BookNew from "$templates/BookNew";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/BookNotFoundProblem";
import { useSessionAtom } from "$store/session";
import { useBook } from "$utils/book";
import useBookNewHandlers from "$utils/useBookNewHandlers";
import type { Query as BookEditQuery } from "./edit";

export type Query = BookEditQuery;

function Generate({ bookId, context }: Query) {
  const { isContentEditable } = useSessionAtom();
  const { book, error } = useBook(bookId, isContentEditable);
  const handlers = useBookNewHandlers(context, bookId);

  if (error) return <BookNotFoundProblem />;
  if (!book) return <Placeholder />;

  return <BookNew book={book} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<Query, "context"> = router.query;

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Generate bookId={bookId} context={context} />;
}

export default Router;
