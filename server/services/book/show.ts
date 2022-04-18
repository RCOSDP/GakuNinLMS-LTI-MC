import type { FastifySchema, FastifyRequest } from "fastify";
import { outdent } from "outdent";
import { bookSchema } from "$server/models/book";
import type { BookParams } from "$server/validators/bookParams";
import { bookParamsSchema, BookQuery } from "$server/validators/bookParams";
import authUser from "$server/auth/authUser";
import findBook from "$server/utils/book/findBook";
import findPublicBook from "$server/utils/publicBook/findPublicBook";
import { isInstructor } from "$utils/session";

export const showSchema: FastifySchema = {
  summary: "ブックの取得",
  description: outdent`
    ブックの詳細を取得します。
    教員または管理者いずれでもない場合、LTIリソースとしてリンクされているブックでなければなりません。`,
  params: bookParamsSchema,
  querystring: BookQuery,
  response: {
    200: bookSchema,
    403: {},
    404: {},
  },
};

export const showHooks = {
  auth: [authUser],
};

export async function show({
  session,
  params,
  query,
}: FastifyRequest<{
  Params: BookParams;
  Querystring: BookQuery;
}>) {
  console.log(query);
  const { book_id: bookId } = params;

  if (query.token) {
    const publicBook = await findPublicBook(query.token);
    if (!publicBook || bookId == publicBook.bookId) return { status: 403 };
  } else if (
    !isInstructor(session) &&
    session.ltiResourceLink?.bookId !== bookId
  ) {
    return { status: 403 };
  }

  const book = await findBook(bookId);

  return {
    status: book == null ? 404 : 200,
    body: book,
  };
}
