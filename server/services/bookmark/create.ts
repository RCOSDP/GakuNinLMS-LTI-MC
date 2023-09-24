import type { FastifySchema, FastifyRequest } from "fastify";
import { bookSchema } from "$server/models/book";
import authUser from "$server/auth/authUser";
import createBookmark from "$server/utils/bookmark/createBookmark";
import { bookMarkProps, type BookMarkProps } from "$server/models/bookmark";

export const createSchema: FastifySchema = {
  summary: "ブックマークの作成",
  description: `ブックマークを作成します。`,
  body: bookMarkProps,
  response: {
    201: bookSchema,
    400: {},
  },
};

export const createHooks = {
  auth: [authUser],
};

export async function create({
  body,
}: FastifyRequest<{ Body: BookMarkProps }>) {
  const created = await createBookmark(body);

  if (!created) {
    return {
      status: 400,
    };
  }

  return {
    status: 201,
    body: created,
  };
}
