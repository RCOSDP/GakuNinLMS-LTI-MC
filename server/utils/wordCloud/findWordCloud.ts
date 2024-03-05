import prisma from "$server/utils/prisma";
import type { WordCloudParams } from "$server/validators/wordCloudParams";
import type { WordCloudSchema } from "$server/models/wordCloud";
import { getBookIncludingArg } from "$server/utils/book/bookToBookSchema";
import findBookmarks from "../bookmark/findBookmarks";

async function findWordCloud(
  bookId: WordCloudParams["bookId"],
  userId: number,
  ltiContextId: string,
  ltiConsumerId: string
): Promise<WordCloudSchema | undefined> {
  const book = await prisma.book.findUnique({
    ...getBookIncludingArg(userId),
    where: { id: bookId },
  });
  const sections = book?.sections || [];
  const topicSections = sections.flatMap(
    (section) => section.topicSections || []
  );

  const bookmarkMemoContents = [];

  for (const topicSection of topicSections || []) {
    const bookmarks = await findBookmarks({
      ltiContextId,
      ltiConsumerId,
      topicId: topicSection.topic.id,
    });
    for (const bookmark of bookmarks.bookmark) {
      if (!bookmark.memoContent) {
        continue;
      }
      bookmarkMemoContents.push(bookmark.memoContent);
    }
  }
  console.log(bookmarkMemoContents);
  return [{ text: "test", count: 1 }];
}

export default findWordCloud;
