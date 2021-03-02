export default { title: "templates/Book" };

import { useEffect } from "react";
import { useBookAtom } from "$store/book";
import Book from "./Book";
import { book, session } from "samples";
import { useUpdateSessionAtom } from "$store/session";

const defaultProps = {
  book,
  editable: true,
  onBookEditClick: console.log,
  onBookLinkClick() {
    console.log("onBookLinkClick");
  },
  onTopicEditClick: console.log,
};

export const Default = () => {
  const {
    updateBook,
    itemIndex,
    updateItemIndex,
    nextItemIndex,
  } = useBookAtom();
  useEffect(() => {
    updateBook(defaultProps.book);
  }, [updateBook]);

  return (
    <Book
      {...defaultProps}
      index={itemIndex}
      onTopicEnded={nextItemIndex}
      onItemClick={updateItemIndex}
    />
  );
};

export const Empty = () => {
  const { itemIndex, updateItemIndex, nextItemIndex } = useBookAtom();

  return (
    <Book
      {...defaultProps}
      book={null}
      index={itemIndex}
      onTopicEnded={nextItemIndex}
      onItemClick={updateItemIndex}
    />
  );
};

export const EmptySection = () => {
  const { itemIndex, updateItemIndex, nextItemIndex } = useBookAtom();

  return (
    <Book
      {...defaultProps}
      book={{ ...defaultProps.book, sections: [] }}
      index={itemIndex}
      onTopicEnded={nextItemIndex}
      onItemClick={updateItemIndex}
    />
  );
};

export const ForInstructor = () => {
  const {
    updateBook,
    itemIndex,
    updateItemIndex,
    nextItemIndex,
  } = useBookAtom();
  const [, updateSession] = useUpdateSessionAtom();
  useEffect(() => {
    updateBook(defaultProps.book);
    updateSession({ session, error: false });
  }, [updateBook, updateSession]);

  return (
    <Book
      {...defaultProps}
      index={itemIndex}
      onTopicEnded={nextItemIndex}
      onItemClick={updateItemIndex}
    />
  );
};
