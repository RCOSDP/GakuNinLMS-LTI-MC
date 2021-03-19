import { useSWRInfinite } from "swr";
import type { SortOrder } from "$server/models/sortOrder";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { api } from "./api";
import getDisplayableBook from "./getDisplayableBook";
import useSortOrder from "./useSortOrder";
import useInfiniteProps from "./useInfiniteProps";
import { revalidateBook } from "./book";

const key = "/api/v2/books";

const makeKey = (sort: SortOrder) => (
  page: number,
  prev: BookSchema[] | null
): Parameters<typeof fetchBooks> | null => {
  if (prev && prev.length === 0) return null;
  return [key, sort, page];
};

async function fetchBooks(
  _: typeof key,
  sort: SortOrder,
  page: number
): Promise<BookSchema[]> {
  const res = await api.apiV2BooksGet({ sort, page });
  const books = (res["books"] ?? []) as BookSchema[];
  await Promise.all(books.map((t) => revalidateBook(t.id, t)));
  return books;
}

const filter = (
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean,
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) => (book: BookSchema | undefined) => {
  const displayable = getDisplayableBook(book, isBookEditable, isTopicEditable);
  return displayable == null ? [] : [displayable];
};

export function useBooks(
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean,
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) {
  const [sort, onSortChange] = useSortOrder();
  const res = useSWRInfinite<BookSchema[]>(makeKey(sort), fetchBooks);
  const books =
    res.data?.flat().flatMap(filter(isBookEditable, isTopicEditable)) ?? [];
  return { books, onSortChange, ...useInfiniteProps(res) };
}
