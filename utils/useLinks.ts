import useSWR, { mutate } from "swr";
import type { ApiV2LtiSearchGetSortEnum } from "$openapi";
import type { LinkSearchResultSchema } from "$server/models/link/search";
import { api } from "./api";

type SortOrder = "created" | "reverse-created";

const key = "/api/v2/lti/search";

async function fetchLinks(
  _: typeof key,
  q: string,
  sort: SortOrder,
  perPage: number,
  page: number
): Promise<LinkSearchResultSchema> {
  const res: LinkSearchResultSchema = (await api.apiV2LtiSearchGet({
    q,
    sort: sort as ApiV2LtiSearchGetSortEnum,
    perPage,
    page,
  })) as unknown as LinkSearchResultSchema;
  return res;
}

function useLinks({
  q,
  sort,
  perPage,
  page,
}: {
  q: string;
  sort: SortOrder;
  perPage: number;
  page: number;
}) {
  const { data, isValidating } = useSWR(
    [key, q, sort, perPage, page],
    fetchLinks
  );
  const totalCount = data?.totalCount ?? 0;
  const contents = data?.contents ?? [];
  const loading = isValidating && data != null;
  return { ...data, totalCount, contents, loading };
}

export default useLinks;

export function revalidateLinks({
  q,
  sort,
  perPage,
  page,
}: {
  q: string;
  sort: SortOrder;
  perPage: number;
  page: number;
}): Promise<LinkSearchResultSchema> {
  return mutate([key, q, sort, perPage, page]);
}
