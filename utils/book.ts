import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useUpdateBookAtom } from "$store/book";
import { api } from "./api";
import type { BookProps, BookSchema } from "$server/models/book";
import type { UserSchema } from "$server/models/user";
import bookCreateBy from "./bookCreateBy";

const key = "/api/v2/book/{book_id}";

async function fetchBook(_: typeof key, id: BookSchema["id"]) {
  const res = await api.apiV2BookBookIdGet({ bookId: id });
  return res as BookSchema;
}

export function useBook(id: BookSchema["id"]) {
  const { data } = useSWR<BookSchema>([key, id], fetchBook);
  const updateBook = useUpdateBookAtom();
  useEffect(() => {
    if (data) updateBook(data);
  }, [data, updateBook]);
  return data;
}

export async function createBook(body: BookProps): Promise<BookSchema> {
  // @ts-expect-error NOTE: body.sections[].topics[].name のUnion型に null 含むか否か異なる
  const res = await api.apiV2BookPost({ body });
  await mutate([key, res.id], res);
  return res as BookSchema;
}

export async function connectOrCreateBook(
  user: Pick<UserSchema, "id">,
  book: BookSchema
) {
  if (bookCreateBy(book, user)) return book;
  const { ltiResourceLinks: _, ...bookProps } = book;
  return createBook(bookProps);
}

export async function updateBook({
  id,
  ...body
}: BookProps & { id: BookSchema["id"] }): Promise<BookSchema> {
  // @ts-expect-error NOTE: body.sections[].topics[].name のUnion型に null 含むか否か異なる
  const res = await api.apiV2BookBookIdPut({ bookId: id, body });
  await mutate([key, res.id], res);
  return res as BookSchema;
}

export async function destroyBook(id: BookSchema["id"]) {
  await api.apiV2BookBookIdDelete({ bookId: id });
}

export function revalidateBook(
  id: BookSchema["id"],
  res?: BookSchema
): Promise<BookSchema> {
  return mutate([key, id], res);
}
