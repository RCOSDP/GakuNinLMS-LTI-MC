import { useCallback, useEffect } from "react";
import { atom, useAtomValue, useAtom } from "jotai";
import { RESET, atomWithReset, useUpdateAtom } from "jotai/utils";
import { parse } from "search-query-parser";
import { stringify } from "$utils/linkSearch/parser";
import type { AuthorFilterType } from "$server/models/authorFilter";
import type { LinkSearchTarget } from "$types/linkSearchTarget";
import type { LinkSearchQuery } from "$server/models/link/searchQuery";

type SortOrder = "created" | "reverse-created";

const inputAtom = atomWithReset<string>("");
const oauthClientIdAtom = atomWithReset<string>(""); // "": すべてのLMS
const targetAtom = atomWithReset<LinkSearchTarget>("all");
const queryAtom = atom<{
  type: "link";
  q: string;
  filter: AuthorFilterType;
  sort: SortOrder;
  perPage: number;
  page: number;
}>({
  type: "link",
  q: "",
  filter: "self",
  sort: "created",
  perPage: Number.MAX_SAFE_INTEGER,
  page: 0,
});
const searchQueryAtom = atomWithReset<LinkSearchQuery>({
  type: "link",
  text: [],
  oauthClientId: [],
  linkTitle: [],
  bookName: [],
  topicName: [],
});
const resetAtom = atom<undefined, undefined>(
  () => undefined,
  (_, set) => {
    set(inputAtom, RESET);
    set(oauthClientIdAtom, RESET);
    set(targetAtom, RESET);
  }
);

const getInputQuery = (input: string, target: LinkSearchTarget) => {
  const query = parse(input, { alwaysArray: true, tokenize: true });
  switch (target) {
    case "all":
      return query;
    default:
      return { [target]: query.text };
  }
};

export function useLinkSearchAtom() {
  const [query, updateQuery] = useAtom(queryAtom);
  const [target, updateTarget] = useAtom(targetAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const input = useAtomValue(inputAtom);
  const reset = useUpdateAtom(resetAtom);

  useEffect(
    () =>
      updateQuery((query) => ({
        ...query,
        q: stringify({ ...searchQuery, ...getInputQuery(input, target) }),
        page: 0,
      })),
    [updateQuery, input, target, searchQuery]
  );

  const onSearchSubmit = useUpdateAtom(inputAtom);
  const onSearchTargetChange: (target: LinkSearchTarget) => void = useCallback(
    (target) => updateTarget(target),
    [updateTarget]
  );
  const onSortChange: (sort: SortOrder) => void = useCallback(
    (sort) => updateQuery((query) => ({ ...query, sort, page: 0 })),
    [updateQuery]
  );
  const onLtiClientClick = useUpdateAtom(oauthClientIdAtom);

  useEffect(() => {
    reset();
  }, [reset]);

  return {
    query,
    target,
    onSearchSubmit,
    onSearchTargetChange,
    onLtiClientClick,
    onSortChange,
  };
}
