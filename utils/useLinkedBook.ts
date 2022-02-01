import type { LinkedBook } from "$types/linkedBook";
import { useSessionAtom } from "$store/session";
import { useBook } from "./book";

function useLinkedBook() {
  const { session, isContentEditable } = useSessionAtom();
  const { book, error } = useBook(
    session?.ltiResourceLink?.bookId,
    isContentEditable,
    session?.ltiResourceLink
  );
  const linkedBook: LinkedBook | undefined = book && {
    ...book,
    editable: isContentEditable(book),
  };
  return { linkedBook, error };
}

export default useLinkedBook;
