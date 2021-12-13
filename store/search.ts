import { useCallback, useEffect } from "react";
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

const inputAtom = atom<string>("");

export function useSearchAtom() {
  const [query, updateQuery] = useAtom(queryAtom);
  const [input, updateInput] = useAtom(inputAtom);
  useEffect(() => updateInput(query.q), [updateInput, query]);
  const setType: (type: "book" | "topic") => void = useCallback(
    (type) =>
      updateQuery({
        type,
        q: "",
        filter: "self",
        sort: "updated",
        perPage: 30,
        page: 0,
      }),
    [updateQuery]
  );
  const setPage: (page: number) => void = useCallback(
    (page) => updateQuery((query) => ({ ...query, page })),
    [updateQuery]
  );
  const onSearchInput: (q: string) => void = useCallback(
    (q) => updateInput(q),
    [updateInput]
  );
  const onSearchSubmit: (q: string) => void = useCallback(
    (q) => updateQuery((query) => ({ ...query, q, page: 0 })),
    [updateQuery]
  );
  const onSearchInputReset: () => void = useCallback(
    () => updateQuery((query) => ({ ...query, q: "", page: 0 })),
    [updateQuery]
  );
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
      updateQuery((query) => ({
        ...query,
        q: clsx(input, stringify({ link: [link] })),
        page: 0,
      })),
    [updateQuery, input]
  );
  const onKeywordClick: (keyword: KeywordSchema) => void = useCallback(
    (keyword) =>
      updateQuery((query) => ({
        ...query,
        q: clsx(input, stringify({ keyword: [keyword.name] })),
        page: 0,
      })),
    [updateQuery, input]
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
