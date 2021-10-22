import { mutate } from "swr";
import type { BookSchema } from "$server/models/book";
import type { AuthorsProps } from "$server/validators/authorsProps";
import type { AuthorSchema } from "$server/models/author";
import { api } from "./api";

const key = "/api/v2/book/{book_id}/authors";

export async function updateBookAuthors({
  id,
  ...body
}: AuthorsProps & { id: BookSchema["id"] }): Promise<AuthorSchema[]> {
  const res = api.apiV2BookBookIdAuthorsPut({ bookId: id, body });
  await mutate([key, id], res);
  return res;
}
