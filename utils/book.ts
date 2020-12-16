import { useAtom } from "jotai";
import useSWR, { mutate } from "swr";
import { api } from "./api";
import { BookProps, BookSchema } from "$server/models/book";
import { changeBookAtom } from "$store/book";

const key = "/api/v2/book/{book_id}";

async function fetchBook(_: typeof key, id: BookSchema["id"]) {
  const res = await api.apiV2BookBookIdGet({ bookId: id });
  return res as BookSchema;
}

export function useBook(id: BookSchema["id"]) {
  const { data } = useSWR<BookSchema>([key, id], fetchBook);
  const changeBook = useAtom(changeBookAtom)[1];
  if (data) changeBook(data);
  return data;
}

export async function createBook(body: BookProps): Promise<BookSchema> {
  const res = await api.apiV2BookPost({ body });
  await mutate([key, res.id], res);
  return res as BookSchema;
}

export async function updateBook({
  id,
  ...body
}: BookProps & { id: BookSchema["id"] }): Promise<BookSchema> {
  const res = await api.apiV2BookBookIdPut({ bookId: id, body });
  await mutate([key, res.id], res);
  return res as BookSchema;
}

export async function destroyBook(id: BookSchema["id"]) {
  await api.apiV2BookBookIdDelete({ bookId: id });
}
