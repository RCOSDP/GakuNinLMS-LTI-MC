import type { FastifySchema } from "fastify";
import { outdent } from "outdent";
import type { BookParams } from "$server/validators/bookParams";
import { bookParamsSchema } from "$server/validators/bookParams";
import type { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { isUsersOrAdmin } from "$server/utils/session";
import bookExists from "$server/utils/book/bookExists";
import destroyBook from "$server/utils/book/destroyBook";

export const destroySchema: FastifySchema = {
  summary: "ブックの削除",
  description: outdent`
    ブックを削除します。
    教員または管理者でなければなりません。
    教員は自身の著作のブックでなければなりません。`,
  params: bookParamsSchema,
  response: {
    204: { type: "null", description: "成功" },
    403: {},
    404: {},
  },
};

export const destroyHooks = {
  auth: [authUser, authInstructor],
};

export async function destroy({
  session,
  params,
}: {
  session: SessionSchema;
  params: BookParams;
}) {
  const found = await bookExists(params.book_id);

  if (!found) return { status: 404 };
  if (!isUsersOrAdmin(session, found.authors)) return { status: 403 };

  await destroyBook(params.book_id);

  if (session.ltiResourceLink?.bookId === params.book_id) {
    session.ltiResourceLink = null;
  }

  return { status: 204 };
}
