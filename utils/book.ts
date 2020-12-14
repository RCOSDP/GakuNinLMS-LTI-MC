import { useAtom } from "jotai";
import useSWR from "swr";
import { api } from "./api";
import { BookSchema } from "$server/models/book";
import { changeBookAtom } from "$store/book";

const key = "/api/v2/book/{book_id}";

async function fetchBook(_: typeof key, bookId: BookSchema["id"]) {
  const res = await api.apiV2BookBookIdGet({ bookId });
  return res as BookSchema;
}

export function useBook(bookId: BookSchema["id"]) {
  const { data } = useSWR<BookSchema>([key, bookId], fetchBook);
  const changeBook = useAtom(changeBookAtom)[1];
  if (data) changeBook(data);
  return data;
}
