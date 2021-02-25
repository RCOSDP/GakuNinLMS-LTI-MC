import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useBookAtom } from "$store/book";
import { api } from "./api";
import type { BookProps, BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { revalidateSession } from "./session";

const key = "/api/v2/book/{book_id}";

async function fetchBook(_: typeof key, id: BookSchema["id"]) {
  const res = await api.apiV2BookBookIdGet({ bookId: id });
  return res as BookSchema;
}

export function useBook(id: BookSchema["id"]) {
  const { data, error } = useSWR<BookSchema>([key, id], fetchBook);
  const { updateBook, ...state } = useBookAtom();
  useEffect(() => {
    if (data) updateBook(data);
  }, [data, updateBook]);
  return { ...state, error };
}

export async function createBook(body: BookProps): Promise<BookSchema> {
  // @ts-expect-error NOTE: body.sections[].topics[].name のUnion型に null 含むか否か異なる
  const res = await api.apiV2BookPost({ body });
  await mutate([key, res.id], res);
  return res as BookSchema;
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

export async function addTopicToBook(
  book: BookSchema,
  topic: Pick<TopicSchema, "id">
) {
  const sections = [
    ...book.sections,
    { name: null, topics: [{ id: topic.id }] },
  ];
  return updateBook({ ...book, sections });
}

export async function replaceTopicInBook(
  book: BookSchema,
  target: Pick<TopicSchema, "id">,
  by: Pick<TopicSchema, "id">
) {
  const sections = book.sections.map((section) => {
    const topics = section.topics.map((topic) =>
      topic.id === target.id ? by : topic
    );
    return { ...section, topics };
  });

  return updateBook({ ...book, sections });
}

export async function destroyBook(id: BookSchema["id"]) {
  await api.apiV2BookBookIdDelete({ bookId: id });
  await revalidateSession();
}

export function revalidateBook(
  id: BookSchema["id"],
  res?: BookSchema
): Promise<BookSchema> {
  return mutate([key, id], res);
}
