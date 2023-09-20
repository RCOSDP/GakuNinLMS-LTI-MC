import type { FastifySchema, FastifyRequest } from "fastify";
import { bookSchema } from "$server/models/book";
import type {
  BookPublicParams,
  BookPublicHeaders,
} from "$server/validators/bookPublicParams";
import {
  bookPublicParamsSchema,
  bookPublicHeadersSchema,
} from "$server/validators/bookPublicParams";
import findPublicBook from "$server/utils/publicBook/findPublicBook";
import findBook from "$server/utils/book/findBook";

export type Params = BookPublicParams;
export type Headers = BookPublicHeaders;

export const schema: FastifySchema = {
  summary: "公開ブックの取得",
  description: "公開ブックの詳細を取得します。",
  params: bookPublicParamsSchema,
  headers: bookPublicHeadersSchema,
  response: {
    200: bookSchema,
    404: {},
  },
};

export const hook = {
  auth: [],
};

export async function method({
  params,
  headers,
}: FastifyRequest<{ Params: BookPublicParams; Headers: BookPublicHeaders }>) {
  const { token } = params;
  const { originreferer } = headers;

  const publicBook = await findPublicBook(token, originreferer ?? "");
  if (!publicBook) {
    return { status: 404 };
  }

  const book = await findBook(publicBook.bookId, publicBook.userId);

  return {
    status: book == null ? 404 : 200,
    body: book,
  };
}
