import { useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import clsx from "clsx";
import stringify from "$utils/search/stringify";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { KeywordSchema } from "$server/models/keyword";
import type { SortOrder } from "$server/models/sortOrder";
import type { AuthorFilterType } from "$server/models/authorFilter";
import type { SearchQueryBase } from "$server/utils/search/query";

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

const searchQueryAtom = atomWithReset<Partial<SearchQueryBase>>({});

const inputAtom = atom<string>("");

export function useSearchAtom() {
  const [query, updateQuery] = useAtom(queryAtom);
  const [searchQuery, updateSearchQuery] = useAtom(searchQueryAtom);
  const [input, updateInput] = useAtom(inputAtom);
  useEffect(
    () =>
      updateQuery((query) => ({
        ...query,
        q: clsx(input, stringify(searchQuery)),
        page: 0,
      })),
    [updateQuery, input, searchQuery]
  );
  const setType: (type: "book" | "topic") => void = useCallback(
    (type) => {
      updateQuery({
        type,
        q: "",
        filter: "self",
        sort: "updated",
        perPage: 30,
        page: 0,
      });
      updateSearchQuery(RESET);
    },
    [updateQuery, updateSearchQuery]
  );
  const setPage: (page: number) => void = useCallback(
    (page) => updateQuery((query) => ({ ...query, page })),
    [updateQuery]
  );
  const onSearchInput: (input: string) => void = useCallback(
    (input) => updateInput(input),
    [updateInput]
  );
  const onSearchSubmit: (input: string) => void = useCallback(
    (input) =>
      updateQuery((query) => ({
        ...query,
        q: clsx(input, stringify(searchQuery)),
        page: 0,
      })),
    [updateQuery, searchQuery]
  );
  const onSearchInputReset: () => void = useCallback(() => {
    updateQuery((query) => ({
      ...query,
      q: stringify(searchQuery),
      page: 0,
    }));
    updateInput("");
  }, [updateQuery, searchQuery, updateInput]);
  const onFilterChange: (filter: AuthorFilterType) => void = useCallback(
    (filter) => updateQuery((query) => ({ ...query, filter, page: 0 })),
    [updateQuery]
  );
  const onSortChange: (sort: SortOrder) => void = useCallback(
    (sort) => updateQuery((query) => ({ ...query, sort, page: 0 })),
    [updateQuery]
  );
  const onLtiContextClick: (
    link: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
  ) => void = useCallback(
    (link) =>
      updateSearchQuery((searchQuery) => ({
        ...searchQuery,
        link: [...(searchQuery.link ?? []), link],
      })),
    [updateSearchQuery]
  );
  const onKeywordClick: (keyword: KeywordSchema) => void = useCallback(
    (keyword) =>
      updateSearchQuery((searchQuery) => ({
        ...searchQuery,
        keyword: [...(searchQuery.keyword ?? []), keyword.name],
      })),
    [updateSearchQuery]
  );

  return {
    query,
    input,
    setType,
    setPage,
    onSearchInput,
    onSearchInputReset,
    onSearchSubmit,
    onFilterChange,
    onSortChange,
    onLtiContextClick,
    onKeywordClick,
  };
}
