import type { Prisma } from "@prisma/client";
import type { AuthorFilter } from "$server/models/authorFilter";
import type { SearchResultSchema } from "$server/models/search";
import {
  bookIncludingTopicsArg,
  bookToBookSchema,
} from "$server/utils/book/bookToBookSchema";
import makeSortOrderQuery from "$server/utils/makeSortOrderQuery";
import prisma from "$server/utils/prisma";
import type { BookSearchQuery } from "$server/models/searchQuery";

/**
 * 検索クエリーによるブック検索
 * @param query 検索クエリー
 * @param filter 作成者フィルター
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
): Promise<SearchResultSchema> {
  const insensitiveMode = { mode: "insensitive" as const };
  const where: Prisma.BookWhereInput = {
    AND: [
      // NOTE: 管理者でなければ共有されている範囲のみ
      ...(filter.type !== "self" && !filter.admin ? [{ shared: true }] : []),
      ...(filter.type === "self"
        ? [{ authors: { some: { userId: filter.by } } }]
        : []),
      ...(filter.type === "other"
        ? [{ NOT: { authors: { some: { userId: filter.by } } } }]
        : []),
      // NOTE: text - 検索文字列 (名称 OR 説明 OR 作成者名)
      ...text.map((t) => ({
        OR: [
          { name: { contains: t, ...insensitiveMode } },
          { description: { contains: t, ...insensitiveMode } },
          { sections: { some: { name: { contains: t, ...insensitiveMode } } } },
          {
            sections: {
              some: {
                topicSections: {
                  some: {
                    topic: {
                      name: { contains: t, ...insensitiveMode },
                    },
                  },
                },
              },
            },
          },
          {
            sections: {
              some: {
                topicSections: {
                  some: {
                    topic: { description: { contains: t, ...insensitiveMode } },
                  },
                },
              },
            },
          },
          {
            authors: {
              some: {
                user: { name: { contains: t, ...insensitiveMode } },
              },
            },
          },
        ],
      })),
      // NOTE: name - 名称 (ブック名・セクション名・トピック名)
      ...name.map((n) => ({
        OR: [
          { name: { contains: n, ...insensitiveMode } },
          { sections: { some: { name: { contains: n, ...insensitiveMode } } } },
          {
            sections: {
              some: {
                topicSections: {
                  some: {
                    topic: { name: { contains: n, ...insensitiveMode } },
                  },
                },
              },
            },
          },
        ],
      })),
      // NOTE: description - 説明 (Markdown)
      ...description.map((d) => ({
        OR: [
          { description: { contains: d, ...insensitiveMode } },
          {
            sections: {
              some: {
                topicSections: {
                  some: {
                    topic: { description: { contains: d, ...insensitiveMode } },
                  },
                },
              },
            },
          },
        ],
      })),
      // NOTE: author - 作成者名
      ...author.map((a) => ({
        authors: {
          some: {
            user: { name: { contains: a, ...insensitiveMode } },
          },
        },
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
  };

  const totalCount = await prisma.book.count({ where });
  const books = await prisma.book.findMany({
    ...bookIncludingTopicsArg,
    where,
    orderBy: makeSortOrderQuery(sort),
    skip: page * perPage,
    take: perPage,
  });

  const contents = books
    .map(bookToBookSchema)
    .map((book) => ({ type: "book" as const, ...book }));

  return { totalCount, contents, page, perPage };
}

export default bookSearch;
