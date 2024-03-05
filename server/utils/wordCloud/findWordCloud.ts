import prisma from "$server/utils/prisma";
import kuromoji from "kuromoji";
import type { WordCloudParams } from "$server/validators/wordCloudParams";
import type { WordCloudSchema } from "$server/models/wordCloud";
import { getBookIncludingArg } from "$server/utils/book/bookToBookSchema";
import findBookmarks from "../bookmark/findBookmarks";

function buildTokenizer() {
  return new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>(
    (resolve, reject) => {
      kuromoji
        .builder({ dicPath: "node_modules/kuromoji/dict" })
        .build((err, tokenizer) => {
          if (err) {
            reject(err);
          } else {
            resolve(tokenizer);
          }
        });
    }
  );
}

const tokenize = async (text: string) => {
  const tokenizer = await buildTokenizer();

  return tokenizer.tokenize(text);
};

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
      const res = await tokenize(bookmark.memoContent);
      console.log(res);
    }
  }
  console.log(bookmarkMemoContents);
  return [{ text: "test", count: 1 }];
}

export default findWordCloud;
