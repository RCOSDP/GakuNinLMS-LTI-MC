import type { FastifySchema, FastifyRequest } from "fastify";
import authUser from "$server/auth/authUser";
import createBookmark from "$server/utils/bookmark/createBookmark";
import {
  bookMarkPropsSchema,
  bookMarkSchema,
  type BookMarkProps,
} from "$server/models/bookmark";

export const createSchema: FastifySchema = {
  summary: "ブックマークの作成",
  description: `ブックマークを作成します。`,
  body: bookMarkPropsSchema,
  response: {
    201: bookMarkSchema,
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
