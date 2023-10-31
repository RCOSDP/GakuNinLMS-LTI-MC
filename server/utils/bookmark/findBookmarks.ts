import type { BookmarkSchema } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";

async function findBookmarks(
  topicId: number,
  userId: User["id"]
): Promise<BookmarkSchema[]> {
  const bookmarks = await prisma.bookmark.findMany({
    where: { topicId, userId },
    include: {
      topic: true,
      tag: true,
    },
  });

  return bookmarks;
}

export default findBookmarks;
