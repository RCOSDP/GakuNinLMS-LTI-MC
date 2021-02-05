export default { title: "templates/BookLink" };

import BookLink from "./BookLink";
import { Default as AppBar } from "$organisms/AppBar.stories";
import { books } from "samples";

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
    <AppBar />
    <BookLink {...props} />
  </>
);

export const Empty = () => (
  <>
    <AppBar />
    <BookLink {...props} books={[]} />
  </>
);
