export default { title: "templates/Books" };

import Books from "./Books";
import AppBar from "$organisms/AppBar";
import { books, ltiResourceLink, session } from "samples";

const appBarHandlers = {
  onBooksClick: console.log,
  onTopicsClick: console.log,
  onDashboardClick: console.log,
};

const handlers = {
  onBookClick: console.log,
  onBookEditClick: console.log,
  onBookNewClick() {
    console.log("onBookNewClick");
  },
  onBookLinkClick() {
    console.log("onBookLinkClick");
  },
};

export const Default = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <Books books={books} ltiResourceLink={ltiResourceLink} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <Books books={[]} ltiResourceLink={null} {...handlers} />
  </>
);
