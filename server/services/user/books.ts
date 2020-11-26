import { FastifyInstance } from "fastify";
import Method from "$server/types/method";
import { bookSchema } from "$server/models/book";
import { UserParams, userParamsSchema } from "$server/validators/userParams";
import {
  PaginationProps,
  paginationPropsSchema,
} from "$server/validators/paginationProps";
import { isInstructor } from "$server/utils/session";
import { findWrittenBooks } from "$server/utils/user";

export type Query = PaginationProps;
export type Params = UserParams;

export const method: Method = {
  get: {
    description: "作成したブックの一覧",
    querystring: paginationPropsSchema,
    params: userParamsSchema,
    response: {
      200: {
        description: "成功時",
        type: "object",
        properties: {
          books: {
            type: "array",
            items: bookSchema,
          },
          page: {
            type: "integer",
          },
          perPage: {
            type: "integer",
          },
        },
      },
    },
  },
};

export async function get({ query, params }: { query: Query; params: Params }) {
  const page = query.page ?? 0;
  const perPage = query.per_page ?? 100;
  const { user_id: userId } = params;
  const books = await findWrittenBooks(userId, page, perPage);

  return {
    status: 200,
    body: { books, page, perPage },
  };
}

export function preHandler(fastify: FastifyInstance) {
  return fastify.auth([
    async ({ session }) => {
      const authorized = isInstructor(session);
      if (!authorized) throw new Error("unauthorized");
    },
  ]);
}
