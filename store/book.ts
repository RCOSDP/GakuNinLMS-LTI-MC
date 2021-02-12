import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";

type BookState = {
  book: BookSchema | undefined;
  itemIndex: ItemIndex;
  itemExists(itemIndex: ItemIndex): TopicSchema | undefined;
};

const bookAtom = atom<BookState>({
  book: undefined,
  itemIndex: [0, 0],
  itemExists: () => undefined,
});

const updateBookAtom = atom<undefined, BookSchema>(
  () => undefined,
  (_, set, book) => {
    set(bookAtom, {
      book,
      itemIndex: [0, 0],
      itemExists: ([sectionIndex, topicIndex]) =>
        book.sections[sectionIndex]?.topics[topicIndex],
    });
  }
);

const updateItemIndexAtom = atom<undefined, ItemIndex>(
  () => undefined,
  (get, set, itemIndex) => {
    const { book, itemExists } = get(bookAtom);
    if (itemExists(itemIndex)) {
      set(bookAtom, { book, itemIndex, itemExists });
    }
  }
);

const nextItemIndexAtom = atom(
  () => undefined,
  (get, set) => {
    const {
      book,
      itemIndex: [prevSectionIndex, prevTopicIndex],
      itemExists,
    } = get(bookAtom);

    const nextTopicIndex = [prevSectionIndex, prevTopicIndex + 1] as const;
    const nextSectionIndex = [prevSectionIndex + 1, 0] as const;

    if (itemExists(nextTopicIndex)) {
      set(bookAtom, {
        book,
        itemIndex: nextTopicIndex,
        itemExists,
      });
    } else if (itemExists(nextSectionIndex)) {
      set(bookAtom, {
        book,
        itemIndex: nextSectionIndex,
        itemExists,
      });
    }
  }
);

export function useBookAtom() {
  const state = useAtomValue(bookAtom);
  const updateBook = useUpdateAtom(updateBookAtom);
  const updateItemIndex = useUpdateAtom(updateItemIndexAtom);
  const nextItemIndex = useUpdateAtom(nextItemIndexAtom);
  return { ...state, updateBook, updateItemIndex, nextItemIndex };
}
