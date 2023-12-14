import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";

type TopicIdParam = {
  topicId: BookmarkSchema["topicId"];
  tagIds?: BookmarkSchema["tagId"][];
};
type TagIdParam = {
  topicId?: BookmarkSchema["topicId"];
  tagIds: BookmarkSchema["tagId"][];
};

type FindBookmarksParams = {
  ltiContextId: BookmarkSchema["ltiContext"]["id"];
  userId?: User["id"];
} & (TopicIdParam | TagIdParam);

export const bookmarkWithTopicQuery = {
  include: {
    tag: true,
    topic: {
      select: {
        id: true,
        name: true,
        timeRequired: true,
        bookmarks: {
          select: {
            id: true,
            updatedAt: true,
            tag: true,
            ltiContext: true,
          },
        },
      },
    },
    ltiContext: true,
  },
};

export const createIncludeQueryWithUserContext = (userId?: User["id"]) => {
  return {
    include: {
      tag: true,
      topic: {
        select: {
          id: true,
          name: true,
          timeRequired: true,
          bookmarks: {
            select: {
              id: true,
              updatedAt: true,
              tag: true,
              ltiContext: true,
            },
            where: {
              userId,
            },
          },
        },
      },
      ltiContext: true,
    },
  };
};

async function findBookmarks({
  ltiContextId,
  topicId,
  tagIds,
  userId,
}: FindBookmarksParams): Promise<{
  bookmark: BookmarkSchema[];
  bookmarkTagMenu: BookmarkTagMenu;
}> {
  if (topicId !== undefined) {
    const bookmark = await prisma.bookmark.findMany({
      where: {
        ltiContextId: ltiContextId,
        topicId: topicId,
        userId: userId,
      },
      ...bookmarkWithTopicQuery,
    });

    const bookmarkTagMenu = await prisma.tag.findMany();

    return {
      bookmark,
      bookmarkTagMenu,
    };
  } else if (tagIds !== undefined) {
    const bookmark = await prisma.bookmark.findMany({
      where: {
        OR: tagIds.map((tagId) => ({
          tagId: tagId,
        })),
        userId: userId,
      },
      ...createIncludeQueryWithUserContext(userId),
    });

    // コースとトピックが一致するブックマークの重複を削除
    const uniqueData = [
      ...new Map(
        bookmark.map((item) => [`${item.ltiContext.id}-${item.topicId}`, item])
      ).values(),
    ];

    const bookmarkTagMenu = await prisma.tag.findMany();

    return {
      bookmark: uniqueData,
      bookmarkTagMenu,
    };
  }

  return {
    bookmark: [],
    bookmarkTagMenu: [],
  };
}

export default findBookmarks;
