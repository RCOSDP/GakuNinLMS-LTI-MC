import type { FastifySchema } from "fastify";
import type { BookZoomParams } from "$server/validators/bookZoomParams";
import {
  bookZoomParamsSchema,
  bookZoomResponseSchema,
} from "$server/validators/bookZoomParams";
import { findNewZoomBook } from "$server/utils/zoom/findNewZoomBook";

export type Params = BookZoomParams;

export const schema: FastifySchema = {
  summary: "zoom連携ブックの取得",
  description: "zoom連携ブックのリダイレクト先を取得します。",
  params: bookZoomParamsSchema,
  response: {
    200: bookZoomResponseSchema,
    404: {},
  },
};

export const hook = {
  auth: [],
};

export async function method({ params }: { params: BookZoomParams }) {
  const { meetingId } = params;

  const book = await findNewZoomBook(meetingId);
  if (!book) return { status: 404 };

  if (book.publicBooks.length)
    return { status: 200, body: { publicToken: book.publicBooks[0].token } };

  return { status: 404 };
}
