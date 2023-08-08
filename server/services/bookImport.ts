import type { FastifySchema } from "fastify";
import { outdent } from "outdent";
import {
  BooksImportParams,
  booksImportResultSchema,
} from "$server/models/booksImportParams";
import type { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import importBooksUtil from "$server/utils/book/importBooksUtil";
import type { BookParams } from "$server/validators/bookParams";
import { bookParamsSchema } from "$server/validators/bookParams";

export type Params = BooksImportParams;

export const importSchema: FastifySchema = {
  summary: "ブックの上書きインポート",
  description: outdent`
    ブックを上書きインポートします。
    教員または管理者でなければなりません。`,
  params: bookParamsSchema,
  body: BooksImportParams,
  response: {
    201: booksImportResultSchema,
    400: booksImportResultSchema,
  },
};

export const importHooks = {
  post: { auth: [authUser, authInstructor] },
};

export async function importBook({
  session,
  params,
  body,
}: {
  session: SessionSchema;
  params: BookParams;
  body: BooksImportParams;
}) {
  // TODO
  console.log("### importBook book_id: ", params.book_id);
  const result = await importBooksUtil(session.user, body);
  return {
    status: result.errors && result.errors.length ? 400 : 201,
    body: result,
  };
}
