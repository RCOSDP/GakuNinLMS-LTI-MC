import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { RESET, atomWithReset, useUpdateAtom } from "jotai/utils";
import type { AuthorSchema } from "$server/models/author";

const authorsAtom = atomWithReset<AuthorSchema[]>([]);

const updateAuthorsAtom = atom<null, AuthorSchema[]>(
  null,
  (_, set, authors) => {
    set(authorsAtom, authors);
  }
);

export function useAuthorsAtom() {
  const [authors, reset] = useAtom(authorsAtom);
  const updateAuthors = useUpdateAtom(updateAuthorsAtom);
  useEffect(
    () => () => {
      reset(RESET);
    },
    [reset]
  );
  return { authors, updateAuthors };
}
