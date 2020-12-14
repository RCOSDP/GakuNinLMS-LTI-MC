import { atom } from "jotai";
import { BookSchema } from "$server/models/book";

type ItemIndex = [number, number];

const bookAtom = atom<BookSchema | undefined>(undefined);
const itemIndexAtom = atom<ItemIndex>([0, 0]);

export const changeBookAtom = atom<BookSchema | undefined, BookSchema>(
  (get) => get(bookAtom),
  (_, set, arg) => {
    set(bookAtom, () => {
      set(itemIndexAtom, [0, 0]);
      return arg;
    });
  }
);

export const nextItemIndexAtom = atom<ItemIndex, ItemIndex | undefined>(
  (get) => get(itemIndexAtom),
  (get, set, arg) => {
    const book = get(bookAtom);
    if (!book) return;
    if (arg) return set(itemIndexAtom, arg);
    const [prevSectionIndex, prevTopicIndex] = get(itemIndexAtom);
    const topicIndex = prevTopicIndex + 1;
    const topicExists = book.sections[prevSectionIndex].topics[topicIndex];
    if (topicExists) return set(itemIndexAtom, [prevSectionIndex, topicIndex]);
    const sectionIndex = prevSectionIndex + 1;
    const sectionExists = book.sections[sectionIndex];
    if (sectionExists) return set(itemIndexAtom, [sectionIndex, 0]);
  }
);
