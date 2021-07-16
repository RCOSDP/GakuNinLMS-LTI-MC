import { BookProps } from "$server/models/book";
import prisma from "$server/utils/prisma";

/**
 * 学習時間の集計
 * 各セクションに含まれるすべてのトピックの学習時間の合計を返します
 * @param book 計算対象のブック
 * @return 学習時間 (秒)
 */
async function aggregateTimeRequired(
  book: Pick<BookProps, "sections">
): Promise<number> {
  const ids =
    book.sections?.flatMap(({ topics }) => topics.map(({ id }) => id)) ?? [];
  const topics = await prisma.topic.findMany({
    where: { id: { in: ids } },
    select: { timeRequired: true },
  });
  const total = topics.reduce((acc, { timeRequired }) => acc + timeRequired, 0);
  return Math.floor(total);
}

export default aggregateTimeRequired;
