import useSWR from "swr";
import type { BookSchema } from "$server/models/book";
import type { UserSchema } from "$server/models/user";
import { api } from "./api";
import { revalidateBook } from "./book";
import bookCreateBy from "./bookCreateBy";

const key = "/api/v2/books";

async function fetchBooks(_: typeof key, page = 0): Promise<BookSchema[]> {
  const res = await api.apiV2BooksGet({ page });
  const books = (res["books"] ?? []) as BookSchema[];
  await Promise.all(books.map((t) => revalidateBook(t.id, t)));
  return books;
}

const sharedOrCreatedBy = (author?: Pick<UserSchema, "id">) => (
  book: BookSchema
) => {
  return book.shared || bookCreateBy(book, author);
};

export function useBooks(author: Pick<UserSchema, "id"> | undefined) {
  const { data } = useSWR<BookSchema[]>(key, fetchBooks);
  return data?.filter(sharedOrCreatedBy(author));
}
