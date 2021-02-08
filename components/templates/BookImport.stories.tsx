export default { title: "templates/BookImport" };

import BookImport from "./BookImport";
import AppBar from "$organisms/AppBar";
import { books, session } from "samples";

const appBarHandlers = {
  onBooksClick: console.log,
  onTopicsClick: console.log,
  onDashboardClick: console.log,
};

const handlers = {
  onBookEditClick: console.log,
  onTopicClick: console.log,
  onTopicEditClick: console.log,
  onSubmit: console.log,
  onCancel: () => console.log("Cancel"),
};

export const Default = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <BookImport books={books} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <BookImport books={[]} {...handlers} />
  </>
);
