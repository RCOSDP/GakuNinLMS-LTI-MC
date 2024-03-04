// import prisma from "$server/utils/prisma";
import type { WordCloudParams } from "$server/validators/wordCloudParams";
import type { WordCloudSchema } from "$server/models/wordCloud";

async function findWordCloud(
  bookId: WordCloudParams["bookId"]
): Promise<WordCloudSchema | undefined> {
  console.log(bookId);
  return [{ text: "test", count: 1 }];
}

export default findWordCloud;
