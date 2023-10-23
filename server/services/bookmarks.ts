import type { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import { bookmarkSchema } from "$server/models/bookmark";
import { BookmarkQuery } from "$server/validators/bookmarkQuery";
import authUser from "$server/auth/authUser";
import findBookmarks from "$server/utils/bookmark/findBookmarks";

export const method = {
  get: {
    summary: "ブックマーク一覧",
    description: outdent`ブックマークの一覧を取得します。`,
    querystring: BookmarkQuery,
    response: {
      200: {
        description: "成功時",
        type: "object",
        properties: {
          bookmark: { type: "array", items: bookmarkSchema },
        },
        required: ["bookmark"],
      },
      404: {},
    },
  },
} as const;

export type Query = BookmarkQuery;

export const hooks = {
  get: { auth: [authUser] },
};

export async function index({ query }: FastifyRequest<{ Querystring: Query }>) {
  const { topicId } = query;

  const bookmark = await findBookmarks(topicId);

  return {
    status: 200,
    body: {
      bookmark,
    },
  };
}
