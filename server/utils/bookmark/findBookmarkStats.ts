import type { BookmarkStats } from "$server/models/bookmarkStats";
import prisma from "$server/utils/prisma";
import { bookIncludingTopicsArg } from "$server/utils/book/bookToBookSchema";
import findBookmarkTagMenu from "./findBookmarkTagMenu";

type Option = {
  /** LTI Context ごとでの学習状況を取得するか否か (true: LTI Context ごと, それ以外: すべて) */
  ltiContextOnly: boolean;
  /** LTI Context */
  ltiContext: {
    /** LTI Context ID */
    id: string;
    /** Client ID */
    clientId: string;
  };
};

export default async function findBookmarkStats(
  opt: Option
): Promise<BookmarkStats> {
  const tagMenu = await findBookmarkTagMenu();
  const ltiResourceLinks = opt.ltiContextOnly
    ? []
    : await prisma.ltiResourceLink.findMany({
        where: {
          consumerId: opt.ltiContext.clientId,
          contextId: opt.ltiContext.id,
        },
        include: {
          book: bookIncludingTopicsArg,
        },
      });

  const topics = ltiResourceLinks.flatMap((l) =>
    l.book.sections.flatMap((s) => s.topicSections.flatMap((ts) => ts.topicId))
  );

  const bookmarks = await prisma.bookmark.groupBy({
    by: ["topicId", "tagId", "memoContent"],
    _count: true,
    orderBy: {
      _max: {
        updatedAt: "asc",
      },
    },
    where: opt.ltiContextOnly
      ? {
          ltiContextId: opt.ltiContext.id,
          ltiConsumerId: opt.ltiContext.clientId,
        }
      : {
          topicId: {
            in: topics,
          },
        },
  });

  const stats: BookmarkStats = bookmarks.map((b) => ({
    topicId: b.topicId,
    tagLabel:
      tagMenu.find((t) => t && t.id === b.tagId)?.label ?? b.memoContent,
    totalCount: b._count,
  }));

  return stats;
}
