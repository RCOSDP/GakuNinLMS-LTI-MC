import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import type { BookSchema } from "$server/models/book";
import type { UserSchema } from "$server/models/user";
import type { Filter } from "$types/filter";
import { IsContentEditable } from "$types/content";
import { useSessionAtom } from "$store/session";
import { useSearchAtom } from "$store/search";
import getDisplayableBook from "./getDisplayableBook";
import useSortOrder from "./useSortOrder";
import useInfiniteProps from "./useInfiniteProps";
import useFilter from "./useFilter";
import bookSearch from "./search/bookSearch";
import contentBy from "./contentBy";
import { makeUserBooksKey, fetchUserBooks } from "./userBooks";
import { makeBooksKey, fetchBooks } from "./books";

const makeFilter =
  (
    filter: Filter,
    userId: UserSchema["id"],
    isContentEditable: IsContentEditable
  ) =>
  (book: BookSchema | undefined) => {
    if (book === undefined) return [];
    const isMyBook = contentBy(book, { id: userId });
    if (filter === "other" && isMyBook) return [];
    const displayable = getDisplayableBook(book, isContentEditable);
    return displayable == null ? [] : [displayable];
  };

function useBooks() {
  const { session, isContentEditable } = useSessionAtom();
  const { query } = useSearchAtom();
  const [sort, onSortChange] = useSortOrder();
  const [filter, onFilterChange] = useFilter();
  const userId = session?.user.id ?? NaN;
  const isUserBooks = filter === "self";
  const { key, fetch } = useMemo(
    () =>
      isUserBooks
        ? { key: makeUserBooksKey(userId, sort), fetch: fetchUserBooks }
        : { key: makeBooksKey(sort), fetch: fetchBooks },
    [isUserBooks, userId, sort]
  );
  const bookFilter = useMemo(
    () => makeFilter(filter, userId, isContentEditable),
    [filter, userId, isContentEditable]
  );
  const res = useSWRInfinite<BookSchema[]>(key, fetch);
  const books = bookSearch(res.data?.flat().flatMap(bookFilter) ?? [], query);
  return {
    books,
    onSortChange,
    onFilterChange,
    ...useInfiniteProps(res),
  };
}

export default useBooks;
