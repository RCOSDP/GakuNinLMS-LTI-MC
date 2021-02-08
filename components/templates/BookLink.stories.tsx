export default { title: "templates/BookLink" };

import BookLink from "./BookLink";
import AppBar from "$organisms/AppBar";
import { books, session } from "samples";

const appBarHandlers = {
  onBooksClick: console.log,
  onTopicsClick: console.log,
  onDashboardClick: console.log,
};

const props = {
  books,
  ltiResourceLink: {
    id: "1",
    title: "リンク1",
    contextId: "2",
    contextTitle: "コース2",
  },
  onSubmit: console.log,
  onCancel: () => console.log("Cancel"),
  onBookEditClick: console.log,
  onBookNewClick: console.log,
};

export const Default = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <BookLink {...props} />
  </>
);

export const Empty = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <BookLink {...props} books={[]} />
  </>
);
