import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";

async function findBookmarks(
  topicId: number,
  userId?: User["id"]
): Promise<{
  bookmark: BookmarkSchema[];
  bookmarkTagMenu: BookmarkTagMenu;
}> {
  const whereCondition = {
    topicId,
    ...(userId ? { userId } : {}),
  };

  const bookmark = await prisma.bookmark.findMany({
    where: whereCondition,
    include: {
      topic: true,
      tag: true,
    },
  });

  const bookmarkTagMenu = await prisma.tag.findMany();

  return {
    bookmark,
    bookmarkTagMenu,
  };
}

export default findBookmarks;
