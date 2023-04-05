import { useEffect } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import type AuthorsInput from "$organisms/AuthorsInput";

type AuthorsState = Pick<
  Parameters<typeof AuthorsInput>[0],
  "authors" | "value" | "error" | "helperText"
>;

const authorsAtom = atomWithReset<AuthorsState>({
  value: "",
  authors: [],
});

const updateStateAtom = atom<null, [Partial<AuthorsState>], void>(
  null,
  (get, set, state) => {
    set(authorsAtom, { ...get(authorsAtom), ...state });
  }
);

export function useAuthorsAtom() {
  const [state, reset] = useAtom(authorsAtom);
  const updateState = useSetAtom(updateStateAtom);
  useEffect(
    () => () => {
      reset(RESET);
    },
    [reset]
  );
  const onInput = (value: string) => updateState({ value });
  const onReset = () =>
    updateState({ value: "", error: undefined, helperText: undefined });
  return { ...state, updateState, onInput, onReset };
}
