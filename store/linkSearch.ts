import { useEffect } from "react";
import { atom, useAtomValue } from "jotai";
import { RESET, atomWithReset, useUpdateAtom } from "jotai/utils";
import { stringify } from "$utils/linkSearch/parser";

type SortOrder = "created" | "reverse-created";

const inputAtom = atomWithReset<string>("");
const oauthClientIdAtom = atomWithReset<string>(""); // "": すべてのLMS
const sortAtom = atomWithReset<SortOrder>("created");
const queryAtom = atom<{
  type: "link";
  q: string;
  sort: SortOrder;
  perPage: number;
  page: number;
}>((get) => ({
  type: "link",
  q: stringify({
    type: "link",
    text: [get(inputAtom)],
    oauthClientId: [get(oauthClientIdAtom) || []].flat(),
  }),
  sort: get(sortAtom),
  perPage: Number.MAX_SAFE_INTEGER,
  page: 0,
}));
const resetAtom = atom<undefined, undefined>(
  () => undefined,
  (_, set) => {
    set(inputAtom, RESET);
    set(oauthClientIdAtom, RESET);
    set(sortAtom, RESET);
  }
);

export function useLinkSearchAtom() {
  const query = useAtomValue(queryAtom);
  const reset = useUpdateAtom(resetAtom);
  const onSearchSubmit = useUpdateAtom(inputAtom);
  const onLtiClientClick = useUpdateAtom(oauthClientIdAtom);
  const onSortChange = useUpdateAtom(sortAtom);

  useEffect(() => {
    reset();
  }, [reset]);

  return {
    query,
    onSearchSubmit,
    onLtiClientClick,
    onSortChange,
  };
}
