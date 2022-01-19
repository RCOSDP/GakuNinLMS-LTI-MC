import { useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import clsx from "clsx";
import yn from "yn";
import stringify from "$utils/search/stringify";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { KeywordSchema } from "$server/models/keyword";
import type { SortOrder } from "$server/models/sortOrder";
import type { AuthorFilterType } from "$server/models/authorFilter";
import type { SearchQueryBase } from "$server/models/searchQuery";

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

const searchQueryAtom = atomWithReset<
  Partial<
    Omit<SearchQueryBase, "link"> & { link: Array<LtiResourceLinkSchema> }
  >
>({});

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
      updateInput("");
    },
    [updateQuery, updateSearchQuery, updateInput]
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
  const onAuthorFilterChange: (filter: AuthorFilterType) => void = useCallback(
    (filter) => {
      updateQuery((query) => ({ ...query, filter, page: 0 }));
      // NOTE: 「著者:自分以外」and「共有:なし or すべて」は実用上無意味
      if (filter === "other") {
        updateSearchQuery((searchQuery) => ({
          ...searchQuery,
          shared: [true],
        }));
      }
    },
    [updateQuery, updateSearchQuery]
  );
  const onSharedFilterChange: (filter: "true" | "false" | "all") => void =
    useCallback(
      (filter) => {
        const value = yn(filter);
        updateSearchQuery((searchQuery) => ({
          ...searchQuery,
          shared: typeof value === "boolean" ? [value] : [],
        }));
      },
      [updateSearchQuery]
    );
  const onLicenseFilterChange: (filter: string) => void = useCallback(
    (filter) => {
      const values = {
        [filter]: [filter],
        all: [],
      };
      updateSearchQuery((searchQuery) => ({
        ...searchQuery,
        license: values[filter],
      }));
    },
    [updateSearchQuery]
  );
  const onSortChange: (sort: SortOrder) => void = useCallback(
    (sort) => updateQuery((query) => ({ ...query, sort, page: 0 })),
    [updateQuery]
  );
  const onLtiContextClick: (link: LtiResourceLinkSchema) => void = useCallback(
    (link) => {
      if (
        searchQuery.link?.find(
          ({ contextId, consumerId }) =>
            contextId === link.contextId && consumerId === link.consumerId
        )
      )
        return;
      updateSearchQuery((searchQuery) => ({
        ...searchQuery,
        link: [...(searchQuery.link ?? []), link],
      }));
    },
    [searchQuery.link, updateSearchQuery]
  );
  const onLtiContextDelete: (link: LtiResourceLinkSchema) => void = useCallback(
    (removalLink) =>
      updateSearchQuery((searchQuery) => ({
        ...searchQuery,
        link: (searchQuery.link ?? []).filter(
          (link) => link.id != removalLink.id
        ),
      })),
    [updateSearchQuery]
  );
  const onKeywordClick: (keyword: KeywordSchema) => void = useCallback(
    (keyword) => {
      if (searchQuery.keyword?.includes(keyword.name)) return;
      updateSearchQuery((searchQuery) => ({
        ...searchQuery,
        keyword: [...(searchQuery.keyword ?? []), keyword.name],
      }));
    },
    [searchQuery.keyword, updateSearchQuery]
  );
  const onKeywordDelete: (keyword: string) => void = useCallback(
    (removalKeyword) =>
      updateSearchQuery((searchQuery) => ({
        ...searchQuery,
        keyword: (searchQuery.keyword ?? []).filter(
          (keyword) => keyword != removalKeyword
        ),
      })),
    [updateSearchQuery]
  );

  return {
    query,
    searchQuery,
    input,
    setType,
    setPage,
    onSearchInput,
    onSearchInputReset,
    onSearchSubmit,
    onAuthorFilterChange,
    onSharedFilterChange,
    onLicenseFilterChange,
    onSortChange,
    onLtiContextClick,
    onLtiContextDelete,
    onKeywordClick,
    onKeywordDelete,
  };
}
