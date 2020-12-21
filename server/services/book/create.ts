import { FastifySchema } from "fastify";
import { BookProps, bookPropsSchema, bookSchema } from "$server/models/book";
import createBook from "$server/utils/book/createBook";
import { Session } from "$utils/session";

export const createSchema: FastifySchema = {
  description: "ブックの作成",
  body: bookPropsSchema,
  response: {
    201: bookSchema,
    400: {},
  },
};

export async function create({
  session,
  body,
}: {
  session: Session;
  body: BookProps;
}) {
  if (!session.user) return { status: 400 };

  const created = await createBook(session.user.id, body);

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
