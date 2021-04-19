import { FastifySchema } from "fastify";
import { outdent } from "outdent";
import { BooksImportParams, booksImportParamsSchema, BooksImportResult, booksImportResultSchema } from "$server/validators/booksImportParams";
import { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import importBooksUtil from "$server/utils/book/importBooks";

export type Params = BooksImportParams;

export const importSchema: FastifySchema = {
  summary: "ブックのインポート",
  description: outdent`
    ブックをインポートします。
    教員または管理者でなければなりません。`,
  body: booksImportParamsSchema,
  response: {
    201: booksImportResultSchema,
    400: booksImportResultSchema,
  },
};

export const importHooks = {
  auth: [authUser, authInstructor],
};

export async function importBooks({
  session,
  body,
}: {
  session: SessionSchema;
  body: BooksImportResult;
}) {
  const imported = await importBooksUtil(session.user.id, body);
  return {
    status: imported.errors && imported.errors.length ? 400 : 201,
    body: imported,
  };
}
