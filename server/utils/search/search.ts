import type { ContentSchema } from "$server/models/content";
import type { AuthorFilter } from "$server/models/authorFilter";
import type { SearchResultSchema } from "$server/models/search";
import topicSearch from "$server/utils/search/topicSearch";
import bookSearch from "$server/utils/search/bookSearch";
import { parse } from "$server/utils/search/parser";

async function search(
  type: ContentSchema["type"],
  queryText: string,
  filter: AuthorFilter,
  sort: string,
  page: number,
  perPage: number,
  userId: number,
  ip: string
): Promise<SearchResultSchema> {
  const query = parse(queryText);
  switch (type) {
    case "topic": {
      return await topicSearch(
        { type, ...query },
        filter,
        sort,
        page,
        perPage,
        ip
      );
    }
    case "book": {
      return await bookSearch(
        { type, ...query },
        filter,
        sort,
        page,
        perPage,
        userId,
        ip
      );
    }
    default:
      return { totalCount: 0, contents: [], page, perPage };
  }
}

export default search;
