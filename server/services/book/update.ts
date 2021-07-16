import { FastifySchema } from "fastify";
import { outdent } from "outdent";
import { BookProps, bookPropsSchema, bookSchema } from "$server/models/book";
import { BookParams, bookParamsSchema } from "$server/validators/bookParams";
import { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { isUserOrAdmin } from "$server/utils/session";
import bookExists from "$server/utils/book/bookExists";
import updateBook from "$server/utils/book/updateBook";

export const updateSchema: FastifySchema = {
  summary: "ブックの更新",
  description: outdent`
    ブックを更新します。
    教員または管理者でなければなりません。
    教員は自身の作成したブックでなければなりません。`,
  params: bookParamsSchema,
  body: bookPropsSchema,
  response: {
    201: bookSchema,
    400: {},
    403: {},
    404: {},
  },
};

export const updateHooks = {
  auth: [authUser, authInstructor],
};

export async function update({
  session,
  body,
  params,
}: {
  session: SessionSchema;
  body: BookProps;
  params: BookParams;
}) {
  const found = await bookExists(params.book_id);

  if (!found) return { status: 404 };
  if (!isUserOrAdmin(session, { id: found.authorId })) return { status: 403 };

  const created = await updateBook(found.authorId, {
    ...body,
    id: params.book_id,
  });

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
