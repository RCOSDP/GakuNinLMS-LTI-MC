import type { BookmarkSchema } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { BookmarkParams } from "$server/validators/bookmarkParams";

async function findBookmark(
  id: BookmarkParams["id"]
): Promise<BookmarkSchema | undefined> {
  const bookmark = await prisma.bookmark.findUnique({
    where: { id },
    include: {
      topic: true,
      tag: true,
    },
  });

  if (!bookmark) {
    return;
  }

  return bookmark;
}

export default findBookmark;
