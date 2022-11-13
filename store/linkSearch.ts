import { useCallback, useEffect } from "react";
import { atom, useAtomValue, useAtom } from "jotai";
import { RESET, atomWithReset, useUpdateAtom } from "jotai/utils";
import { stringify } from "$utils/linkSearch/parser";
import type { AuthorFilterType } from "$server/models/authorFilter";
import type { LinkSearchTarget } from "$types/linkSearchTarget";

type SortOrder = "created" | "reverse-created";

const inputAtom = atomWithReset<string>("");
const oauthClientIdAtom = atomWithReset<string>(""); // "": すべてのLMS
const linkTitleAtom = atomWithReset<string>(""); // "": すべてのリンク
const bookNameAtom = atomWithReset<string>(""); // "": すべてのブック
const topicNameAtom = atomWithReset<string>(""); // "": すべてのトピック
const targetAtom = atomWithReset<LinkSearchTarget>("all");
const sortAtom = atomWithReset<SortOrder>("created");
const queryAtom = atom<{
  type: "link";
  q: string;
  filter: AuthorFilterType;
  sort: SortOrder;
  perPage: number;
  page: number;
}>((get) => ({
  type: "link",
  q: stringify({
    type: "link",
    text: [get(inputAtom)],
    oauthClientId: [get(oauthClientIdAtom) || []].flat(),
    linkTitle: [get(inputAtom) || []].flat(),
    bookName: [get(bookNameAtom) || []].flat(),
    topicName: [get(topicNameAtom) || []].flat(),
  }),
  filter: "self",
  sort: get(sortAtom),
  perPage: Number.MAX_SAFE_INTEGER,
  page: 0,
}));
const resetAtom = atom<undefined, undefined>(
  () => undefined,
  (_, set) => {
    set(inputAtom, RESET);
    set(oauthClientIdAtom, RESET);
    set(linkTitleAtom, RESET);
    set(bookNameAtom, RESET);
    set(topicNameAtom, RESET);
    set(sortAtom, RESET);
  }
);

export function useLinkSearchAtom() {
  const query = useAtomValue(queryAtom);
  const reset = useUpdateAtom(resetAtom);
  const onSearchSubmit = useUpdateAtom(inputAtom);
  const onLtiClientClick = useUpdateAtom(oauthClientIdAtom);
  const onSortChange = useUpdateAtom(sortAtom);
  const [target, updateTarget] = useAtom(targetAtom);
  const onSearchTargetChange: (target: LinkSearchTarget) => void = useCallback(
    (target) => updateTarget(target),
    [updateTarget]
  );

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
