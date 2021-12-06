import type { AuthorFilter } from "$server/models/authorFilter";
import type { SearchResultSchema } from "$server/models/search";
import makeSortOrderQuery from "$server/utils/makeSortOrderQuery";
import prisma from "$server/utils/prisma";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "$server/utils/topic/topicToTopicSchema";
import type { TopicSearchQuery } from "./query";

/**
 * 検索クエリーによるトピック検索
 * @param query 検索クエリー
 * @param filter 著者フィルター
 * @param sort 並び順
 * @param page ページ番号
 * @param perPage 1ページあたりの表示件数
 * @return トピック
 */
async function topicSearch(
  {
    text,
    name,
    description,
    author,
    keyword,
    license,
    shared,
  }: TopicSearchQuery,
  filter: AuthorFilter,
  sort: string,
  page: number,
  perPage: number
): Promise<SearchResultSchema> {
  const topics = await prisma.topic.findMany({
    where: {
      AND: [
        // NOTE: 管理者でなければ共有されている範囲のみ
        ...(filter.type !== "self" && !filter.admin ? [{ shared: true }] : []),
        ...(filter.type === "self"
          ? [{ authors: { some: { userId: filter.by } } }]
          : []),
        ...(filter.type === "other"
          ? [{ NOT: { authors: { some: { userId: filter.by } } } }]
          : []),
        // NOTE: text - 検索文字列 (名称 OR 説明 OR 著者名)
        ...text.map((t) => ({
          OR: [
            { name: { contains: t } },
            { description: { contains: t } },
            { authors: { some: { user: { name: { contains: t } } } } },
          ],
        })),
        // NOTE: name - 名称 (トピック名)
        ...name.map((n) => ({
          name: { contains: n },
        })),
        // NOTE: description - 説明 (Markdown)
        ...description.map((d) => ({
          description: { contains: d },
        })),
        // NOTE: author - 著者名
        ...author.map((a) => ({
          authors: { some: { user: { name: { contains: a } } } },
        })),
        // NOTE: keyword - キーワード
        ...keyword.map((k) => ({
          keywords: { some: { name: k } },
        })),
        // NOTE: license - ライセンス
        ...license.map((l) => ({
          license: l,
        })),
        // NOTE: shared - 共有可否
        ...shared.map((s) => ({
          shared: s,
        })),
      ],
    },
    ...topicsWithResourcesArg,
    orderBy: makeSortOrderQuery(sort),
    skip: page * perPage,
    take: perPage,
  });

  const contents = topics
    .map(topicToTopicSchema)
    .map((topic) => ({ type: "topic" as const, ...topic }));

  return { contents, page, perPage };
}

export default topicSearch;
