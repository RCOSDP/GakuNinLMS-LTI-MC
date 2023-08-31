import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import { api } from "./api";

async function importBook(
  bookId: number,
  body: BooksImportParams
): Promise<BooksImportResult> {
  const res = await api.apiV2BookBookIdImportPost({ bookId, body });
  return res as BooksImportResult;
}

export default importBook;
