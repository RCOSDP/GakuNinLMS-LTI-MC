import type { LinkSearchResultSchema } from "$server/models/link/search";
import type { AuthorFilter } from "$server/models/authorFilter";
import linkSearch from "./linkSearch";
import { parse } from "./parser";

async function search(
  queryText: string,
  filter: AuthorFilter,
  sort: string,
  page: number,
  perPage: number,
  course: { oauthClientId: string; ltiContextId: string }
): Promise<LinkSearchResultSchema> {
  const query = parse(queryText);
  return await linkSearch(query, filter, sort, page, perPage, course);
}

export default search;
