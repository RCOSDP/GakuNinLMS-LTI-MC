import useSWR from "swr";
import type { BookSchema } from "$server/models/book";
import type { UserSchema } from "$server/models/user";
import { api } from "./api";
import { revalidateBook } from "./book";
import bookCreateBy from "./bookCreateBy";
import topicCreateBy from "./topicCreateBy";

const key = "/api/v2/books";

async function fetchBooks(_: typeof key, page = 0): Promise<BookSchema[]> {
  const res = await api.apiV2BooksGet({ page });
  const books = (res["books"] ?? []) as BookSchema[];
  await Promise.all(books.map((t) => revalidateBook(t.id, t)));
  return books;
}

function sharedOrCreatedBy(
  author: Pick<UserSchema, "id"> | undefined,
  book: BookSchema
) {
  return book.shared || bookCreateBy(book, author);
}

const filter = (author?: Pick<UserSchema, "id">) => (book: BookSchema) => {
  if (!sharedOrCreatedBy(author, book)) return [];
  const sections = book.sections.map((section) => {
    const topics = section.topics.filter(
      (topic) => topic.shared || topicCreateBy(topic, author)
    );
    return { ...section, topics };
  });
  return [{ ...book, sections }];
};

export function useBooks(author: Pick<UserSchema, "id"> | undefined) {
  const { data } = useSWR<BookSchema[]>(key, fetchBooks);
  return data?.flatMap(filter(author));
}
