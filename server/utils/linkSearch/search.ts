import type { LinkSearchResultSchema } from "$server/models/link/search";
import type { AuthorFilter } from "$server/models/authorFilter";
import linkSearch from "./linkSearch";
import { parse } from "./parser";

async function search(
  queryText: string,
  filter: AuthorFilter,
  sort: string,
  page: number,
  perPage: number
): Promise<LinkSearchResultSchema> {
  const query = parse(queryText);
  return await linkSearch(query, filter, sort, page, perPage);
}

export default search;
