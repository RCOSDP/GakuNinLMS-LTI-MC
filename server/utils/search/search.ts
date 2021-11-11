import type { ContentSchema } from "$server/models/content";
import type { AuthorFilter } from "$server/models/authorFilter";
import topicSearch from "$server/utils/search/topicSearch";
import bookSearch from "$server/utils/search/bookSearch";
import { parse } from "$server/utils/search/parser";

async function search(
  type: ContentSchema["type"],
  queryText: string,
  filter: AuthorFilter,
  sort: string,
  page: number,
  perPage: number
): Promise<Array<ContentSchema>> {
  const query = parse(queryText);
  switch (type) {
    case "topic": {
      const topics = await topicSearch(
        { type, ...query },
        filter,
        sort,
        page,
        perPage
      );
      return topics.map((topic) => ({ type, ...topic }));
    }
    case "book": {
      const books = await bookSearch(
        { type, ...query },
        filter,
        sort,
        page,
        perPage
      );
      return books.map((book) => ({ type, ...book }));
    }
    default:
      return [];
  }
}

export default search;
