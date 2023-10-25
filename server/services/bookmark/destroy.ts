import type { FastifySchema } from "fastify";
import authUser from "$server/auth/authUser";
import deleteBookmark from "$server/utils/bookmark/deleteBookmark";
import { BookmarkParams } from "$server/validators/bookmarkParams";

export const destroySchema: FastifySchema = {
  summary: "ブックマークの削除",
  description: `ブックマークを削除します。`,
  params: BookmarkParams,
  response: {
    204: { type: "null", description: "成功" },
    400: {},
  },
};

export const destroyHooks = {
  auth: [authUser],
};

export async function destroy({ params }: { params: BookmarkParams }) {
  const { id } = params;
  const deleted = await deleteBookmark({
    id,
  });

  if (!deleted) {
    return {
      status: 400,
    };
  }

  return {
    status: 204,
  };
}
