import { FastifySchema } from "fastify";
import { BookParams, bookParamsSchema } from "$server/validators/bookParams";
import destroyBook from "$server/utils/book/destroyBook";

export const destroySchema: FastifySchema = {
  description: "ブックの削除",
  params: bookParamsSchema,
  response: {
    204: {},
  },
};

export async function destroy({ params }: { params: BookParams }) {
  await destroyBook(params.book_id);

  return {
    status: 204,
  };
}
