import { stringify as stringifyBase } from "$server/utils/search/parser";
import type { SearchQueryBase } from "$server/models/searchQuery";

/**
 * 検索クエリーを検索クエリー文字列に変換
 * @param query 検索クエリー
 * @return 検索クエリー文字列
 */
function stringify(query: Partial<SearchQueryBase>): string {
  return stringifyBase({
    text: [],
    name: [],
    description: [],
    author: [],
    partialKeyword: [],
    keyword: [],
    license: [],
    shared: [],
    link: [],
    book: [],
    ...query,
  });
}

export default stringify;
