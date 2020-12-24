export default { title: "templates/BookEdit" };

import BookEdit from "./BookEdit";
import { book } from "samples";

const handleTopicClick = console.log;
const handleSubmit = console.log;

export const Default = () => (
  <BookEdit
    book={book}
    onSubmit={handleSubmit}
    onTopicClick={handleTopicClick}
  />
);

export const Empty = () => (
  <BookEdit
    book={null}
    onSubmit={handleSubmit}
    onTopicClick={handleTopicClick}
  />
);
