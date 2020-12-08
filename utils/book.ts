import useSWR from "swr";
import { api } from "./api";
import { BookSchema } from "$server/models/book";

const key = "/api/v2/book/{book_id}";

async function fetchBook(_: typeof key, bookId: BookSchema["id"]) {
  const res = await api.apiV2BookBookIdGet({ bookId });
  return res as BookSchema;
}

export function useBook(bookId: BookSchema["id"]) {
  return useSWR<BookSchema>([key, bookId], fetchBook);
}
