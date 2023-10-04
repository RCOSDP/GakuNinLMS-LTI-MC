import type { BookmarkProps } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { Bookmark } from "@prisma/client";

async function createBookmark({
  userId,
  ltiCosumerId,
  ltiContextId,
  bookmark,
}: {
  userId: number;
  ltiCosumerId: string;
  ltiContextId: string;
  bookmark: BookmarkProps;
}): Promise<Bookmark | undefined> {
  const created = await prisma.bookmark.create({
    data: {
      userId,
      ltiCosumerId,
      ltiContextId,
      ...bookmark,
    },
  });

  if (!created) {
    return;
  }
  return created;
}

export default createBookmark;
