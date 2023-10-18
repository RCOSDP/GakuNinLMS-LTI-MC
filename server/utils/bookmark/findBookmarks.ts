import type { BookmarkSchema } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";

async function findBookmarks(topicId: number): Promise<BookmarkSchema[]> {
  const bookmarks = await prisma.bookmark.findMany({
    where: { topicId },
    include: {
      topic: true,
      tag: true,
    },
  });

  return bookmarks;
}

export default findBookmarks;
