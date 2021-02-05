export default { title: "templates/BookImport" };

import BookImport from "./BookImport";
import { Default as AppBar } from "$organisms/AppBar.stories";
import { books } from "samples";

const handlers = {
  onBookEditClick: console.log,
  onTopicClick: console.log,
  onTopicEditClick: console.log,
  onSubmit: console.log,
  onCancel: () => console.log("Cancel"),
};

export const Default = () => (
  <>
    <AppBar />
    <BookImport books={books} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <AppBar />
    <BookImport books={[]} {...handlers} />
  </>
);
