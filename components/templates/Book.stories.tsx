export default { title: "templates/Book" };

import { useEffect } from "react";
import { useBookAtom } from "$store/book";
import Book from "./Book";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "$organisms/AppBar";
import { book, session } from "$samples";
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

const appBarHandlers = {
  onBooksClick: console.log,
  onTopicsClick: console.log,
  onDashboardClick: console.log,
};

function SlideAppBar() {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="sticky" session={session} {...appBarHandlers} />
    </Slide>
  );
}

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
    <>
      <SlideAppBar />
      <Book
        {...defaultProps}
        index={itemIndex}
        onTopicEnded={nextItemIndex}
        onItemClick={updateItemIndex}
      />
    </>
  );
};

export const Empty = () => {
  const { itemIndex, updateItemIndex, nextItemIndex } = useBookAtom();

  return (
    <>
      <SlideAppBar />
      <Book
        {...defaultProps}
        book={null}
        index={itemIndex}
        onTopicEnded={nextItemIndex}
        onItemClick={updateItemIndex}
      />
    </>
  );
};

export const EmptySection = () => {
  const { itemIndex, updateItemIndex, nextItemIndex } = useBookAtom();

  return (
    <>
      <SlideAppBar />
      <Book
        {...defaultProps}
        book={{ ...defaultProps.book, sections: [] }}
        index={itemIndex}
        onTopicEnded={nextItemIndex}
        onItemClick={updateItemIndex}
      />
    </>
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
    <>
      <SlideAppBar />
      <Book
        {...defaultProps}
        index={itemIndex}
        onTopicEnded={nextItemIndex}
        onItemClick={updateItemIndex}
      />
    </>
  );
};
