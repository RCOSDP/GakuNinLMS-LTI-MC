export default { title: "templates/Book" };

import { useEffect } from "react";
import { useBookAtom } from "$store/book";
import Book from "./Book";
import { book } from "samples";

const defaultProps = {
  book,
  editable: true,
  onBookEditClick: console.log,
  onBookLinkClick() {
    console.log("onBookLinkClick");
  },
  onTopicEditClick: console.log,
};

// TODO: Please use <Provider> の問題の回避。なぜか回避できる。
function wrap(WrappedComponent: React.FC) {
  function Component() {
    return <WrappedComponent />;
  }
  return Component;
}

export const Default = wrap(() => {
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
});

export const Empty = wrap(() => {
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
});

export const EmptySection = wrap(() => {
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
});

export const ForStudent = wrap(() => {
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
      editable={false}
      index={itemIndex}
      onTopicEnded={nextItemIndex}
      onItemClick={updateItemIndex}
    />
  );
});
