import { useCallback } from "react";
import { atom, useAtom } from "jotai";
import clsx from "clsx";
import stringify from "$utils/search/stringify";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { KeywordSchema } from "$server/models/keyword";
import type { SortOrder } from "$server/models/sortOrder";
import type { AuthorFilterType } from "$server/models/authorFilter";

const queryAtom = atom<{
  type: "none" | "book" | "topic";
  q: string;
  filter: AuthorFilterType;
  sort: SortOrder;
  perPage: number;
  page: number;
}>({
  type: "none",
  q: "",
  filter: "self",
  sort: "updated",
  perPage: 30,
  page: 0,
});

export function useSearchAtom() {
  const [query, updateQuery] = useAtom(queryAtom);
  const onSearchInput: (q: string) => void = useCallback(
    (q) => updateQuery((query) => ({ ...query, q })),
    [updateQuery]
  );
  const onSearchInputReset: () => void = useCallback(
    () => updateQuery((query) => ({ ...query, q: "" })),
    [updateQuery]
  );
  const onFilterChange: (filter: AuthorFilterType) => void = useCallback(
    (filter) => updateQuery((query) => ({ ...query, filter })),
    [updateQuery]
  );
  const onSortChange: (sort: SortOrder) => void = useCallback(
    (sort) => updateQuery((query) => ({ ...query, sort })),
    [updateQuery]
  );
  const onLtiContextClick: (
    link: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
  ) => void = useCallback(
    (link) =>
      updateQuery((query) => ({
        ...query,
        q: clsx(query.q, stringify({ link: [link] })),
      })),
    [updateQuery]
  );
  const onKeywordClick: (keyword: KeywordSchema) => void = useCallback(
    (keyword) =>
      updateQuery((query) => ({
        ...query,
        q: clsx(query.q, `keyword:${keyword.name}`),
      })),
    [updateQuery]
  );

  return {
    query,
    updateQuery,
    onSearchInput,
    onSearchInputReset,
    onFilterChange,
    onSortChange,
    onLtiContextClick,
    onKeywordClick,
  };
}
