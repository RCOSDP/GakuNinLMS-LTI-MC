export default {
  title: "templates/Books",
  parameters: { layout: "fullscreen" },
};

import Books from "./Books";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "$organisms/AppBar";
import { book, books, session } from "samples";

const linkedBook = { ...book, editable: true };

const appBarHandlers = {
  onBooksClick: console.log,
  onTopicsClick: console.log,
  onDashboardClick: console.log,
};

const handlers = {
  onBookPreviewClick: console.log,
  onBookEditClick: console.log,
  onBookNewClick() {
    console.log("onBookNewClick");
  },
  onBooksImportClick() {
    console.log("onBooksImportClick");
  },
  onBookLinkClick() {
    console.log("onBookLinkClick");
  },
  onTopicEditClick: console.log,
};

function SlideAppBar() {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="sticky" session={session} {...appBarHandlers} />
    </Slide>
  );
}

export const Default = () => (
  <>
    <SlideAppBar />
    <Books linkedBook={linkedBook} books={books} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <SlideAppBar />
    <Books books={[]} {...handlers} />
  </>
);
