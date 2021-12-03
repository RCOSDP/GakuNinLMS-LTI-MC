import type { BookSchema } from "$server/models/book";
import type { AuthorFilter } from "$server/models/authorFilter";
import {
  bookIncludingTopicsArg,
  bookToBookSchema,
} from "$server/utils/book/bookToBookSchema";
import makeSortOrderQuery from "$server/utils/makeSortOrderQuery";
import prisma from "$server/utils/prisma";
import type { BookSearchQuery } from "./query";

/**
 * 検索クエリーによるブック検索
 * @param query 検索クエリー
 * @param filter 著者フィルター
 * @param sort 並び順
 * @param page ページ番号
 * @param perPage 1ページあたりの表示件数
 * @return ブック
 */
async function bookSearch(
  {
    text,
    name,
    description,
    author,
    keyword,
    license,
    shared,
    link,
  }: BookSearchQuery,
  filter: AuthorFilter,
  sort: string,
  page: number,
  perPage: number
): Promise<BookSchema[]> {
  const books = await prisma.book.findMany({
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
            { sections: { some: { name: { contains: t } } } },
            {
              sections: {
                some: {
                  topicSections: { some: { topic: { name: { contains: t } } } },
                },
              },
            },
            {
              sections: {
                some: {
                  topicSections: {
                    some: { topic: { description: { contains: t } } },
                  },
                },
              },
            },
            { authors: { some: { user: { name: { contains: t } } } } },
          ],
        })),
        // NOTE: name - 名称 (ブック名・セクション名・トピック名)
        ...name.map((n) => ({
          OR: [
            { name: { contains: n } },
            { sections: { some: { name: { contains: n } } } },
            {
              sections: {
                some: {
                  topicSections: { some: { topic: { name: { contains: n } } } },
                },
              },
            },
          ],
        })),
        // NOTE: description - 説明 (Markdown)
        ...description.map((d) => ({
          OR: [
            { description: { contains: d } },
            {
              sections: {
                some: {
                  topicSections: {
                    some: { topic: { description: { contains: d } } },
                  },
                },
              },
            },
          ],
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
        // NOTE: link - 提供されているコース
        ...link.map((l) => ({
          ltiResourceLinks: { some: l },
        })),
      ],
    },
    ...bookIncludingTopicsArg,
    orderBy: makeSortOrderQuery(sort),
    skip: page * perPage,
    take: perPage,
  });

  return books.map(bookToBookSchema);
}

export default bookSearch;
