import type { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import { bookmarkSchema } from "$server/models/bookmark";
import type { BookmarkParams } from "$server/validators/bookmarkParams";
import { bookmarkParamsSchema } from "$server/validators/bookmarkParams";
import authUser from "$server/auth/authUser";
import findBookmarks from "$server/utils/bookmark/findBookmarks";

export const method = {
  get: {
    summary: "ブックマーク一覧",
    description: outdent`ブックマークの一覧を取得します。`,
    params: bookmarkParamsSchema,
    response: {
      200: bookmarkSchema,
      404: {},
    },
  },
} as const;

export type Params = BookmarkParams;

export const hooks = {
  get: { auth: [authUser] },
};

export async function index({
  params,
}: FastifyRequest<{ Params: BookmarkParams }>) {
  const { topic_id: topicId } = params;

  const bookmark = await findBookmarks(topicId);

  return {
    status: bookmark == null ? 404 : 200,
    body: bookmark,
  };
}
