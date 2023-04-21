import { useRouter } from "next/router";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$templates/TopicNotFoundProblem";
import { useSessionAtom } from "$store/session";
import { releaseBook, useBook } from "$utils/book";
import type { Query as BookEditQuery } from "../edit";
import { pagesPath } from "$utils/$path";
import ReleaseEdit from "$templates/ReleaseEdit";
import type { ReleaseProps } from "$server/models/book/release";

export type Query = BookEditQuery;

function Release({ bookId, context }: Query) {
  const { isContentEditable } = useSessionAtom();
  const { book, error } = useBook(bookId, isContentEditable);
  const router = useRouter();
  const bookEditQuery = { bookId, ...(context && { context }) };
  const back = () =>
    router.push(pagesPath.book.edit.$url({ query: bookEditQuery }));
  async function handleSubmit(release: ReleaseProps) {
    if (!book) return;
    await releaseBook({ id: bookId, ...release });
    return back();
  }
  const handlers = {
    onSubmit: handleSubmit,
  };

  if (error) return <BookNotFoundProblem />;
  if (!book) return <Placeholder />;

  return <ReleaseEdit book={book} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<Query, "context"> = router.query;

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Release bookId={bookId} context={context} />;
}

export default Router;
