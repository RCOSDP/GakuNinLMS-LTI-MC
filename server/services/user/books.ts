import { FastifyInstance } from "fastify";
import Method from "$server/types/method";
import { bookSchema } from "$server/models/book";
import { isInstructor } from "$server/utils/session";
import { findWrittenBooks } from "$server/utils/user";

export type Query = {
  page?: number;
  per_page?: number;
};

export type Params = {
  user_id: number;
};

export const method: Method = {
  get: {
    description: "作成したブックの一覧",
    querystring: {
      type: "object",
      properties: {
        page: {
          type: "integer",
        },
        per_page: {
          type: "integer",
        },
      },
    },
    params: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
      },
    },
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

async function get({ query, params }: { query: Query; params: Params }) {
  const page = query.page ?? 0;
  const perPage = query.per_page ?? 100;
  const { user_id: userId } = params as Params;
  const books = await findWrittenBooks(userId, page, perPage);

  return {
    status: 200,
    body: { books, page, perPage },
  };
}

function preHandler(fastify: FastifyInstance) {
  return fastify.auth([
    async ({ session }) => {
      const authorized = isInstructor(session);
      if (!authorized) throw new Error("unauthorized");
    },
  ]);
}

export default {
  get,
  preHandler,
};
