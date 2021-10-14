import type { FastifySchema } from "fastify";
import { outdent } from "outdent";
import type { BookProps} from "$server/models/book";
import { bookPropsSchema, bookSchema } from "$server/models/book";
import type { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import createBook from "$server/utils/book/createBook";

export const createSchema: FastifySchema = {
  summary: "ブックの作成",
  description: outdent`
    ブックを作成します。
    教員または管理者でなければなりません。`,
  body: bookPropsSchema,
  response: {
    201: bookSchema,
    400: {},
  },
};

export const createHooks = {
  auth: [authUser, authInstructor],
};

export async function create({
  session,
  body,
}: {
  session: SessionSchema;
  body: BookProps;
}) {
  const created = await createBook(session.user.id, body);

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
