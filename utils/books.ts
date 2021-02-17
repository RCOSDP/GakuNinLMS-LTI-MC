import { useSWRInfinite } from "swr";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { api } from "./api";
import useInfiniteProps from "./useInfiniteProps";
import { revalidateBook } from "./book";

const key = "/api/v2/books";

function getKey(page: number, prev: BookSchema[] | null) {
  if (prev && prev.length === 0) return null;
  return [key, page];
}

async function fetchBooks(_: typeof key, page: number): Promise<BookSchema[]> {
  const res = await api.apiV2BooksGet({ page });
  const books = (res["books"] ?? []) as BookSchema[];
  await Promise.all(books.map((t) => revalidateBook(t.id, t)));
  return books;
}

function sharedOrCreatedBy(
  book: BookSchema,
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean
) {
  return book.shared || isBookEditable(book);
}

const filter = (
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean,
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) => (book: BookSchema | undefined) => {
  if (book === undefined) return [];
  if (!sharedOrCreatedBy(book, isBookEditable)) return [];
  const sections = book.sections.map((section) => {
    const topics = section.topics.filter(
      (topic) => topic.shared || isTopicEditable(topic)
    );
    return { ...section, topics };
  });
  return [{ ...book, sections }];
};

export function useBooks(
  isBookEditable: (book: Pick<BookSchema, "author">) => boolean,
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) {
  const { data, size, setSize } = useSWRInfinite<BookSchema[]>(
    getKey,
    fetchBooks
  );
  const books =
    data?.flat().flatMap(filter(isBookEditable, isTopicEditable)) ?? [];
  return { books, ...useInfiniteProps(data, size, setSize) };
}
