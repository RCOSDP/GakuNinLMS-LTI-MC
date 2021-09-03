import type { SortOrder } from "$server/models/sortOrder";
import type { BookSchema } from "$server/models/book";
import {
  BooksImportParams,
  BooksImportResult,
} from "$server/validators/booksImportParams";
import { api } from "./api";
import { revalidateBook } from "./book";

const key = "/api/v2/books";

export const makeBooksKey =
  (sort: SortOrder) =>
  (
    page: number,
    prev: BookSchema[] | null
  ): Parameters<typeof fetchBooks> | null => {
    if (prev && prev.length === 0) return null;
    return [key, sort, page];
  };

export async function fetchBooks(
  _: typeof key,
  sort: SortOrder,
  page: number
): Promise<BookSchema[]> {
  const res = await api.apiV2BooksGet({ sort, page });
  const books = (res["books"] ?? []) as BookSchema[];
  await Promise.all(books.map((t) => revalidateBook(t.id, t)));
  return books;
}

export async function importBooks(
  body: BooksImportParams
): Promise<BooksImportResult> {
  const res = await api.apiV2BooksImportPost({ body });
  const books = (res["books"] ?? []) as BookSchema[];
  books.map((t) => {
    t.publishedAt = new Date(t.publishedAt);
    t.createdAt = new Date(t.createdAt);
    t.updatedAt = new Date(t.updatedAt);
  });
  return res as BooksImportResult;
}
