import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";

type TopicIdParam = {
  topicId: BookmarkSchema["topicId"];
  tagId?: BookmarkSchema["tagId"];
};
type TagIdParam = {
  topicId?: BookmarkSchema["topicId"];
  tagId: BookmarkSchema["tagId"];
};

type FindBookmarksParams = {
  userId?: User["id"];
} & (TopicIdParam | TagIdParam);

async function findBookmarks({
  topicId,
  tagId,
  userId,
}: FindBookmarksParams): Promise<{
  bookmark: BookmarkSchema[];
  bookmarkTagMenu: BookmarkTagMenu;
}> {
  type WhereCondition = {
    topicId?: number;
    tagId?: number;
    userId?: number;
  };

  const whereCondition: WhereCondition = {};

  if (topicId !== undefined) {
    whereCondition.topicId = topicId;
  } else if (tagId !== undefined) {
    whereCondition.tagId = tagId;
  }

  if (userId) {
    whereCondition.userId = userId;
  }

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
