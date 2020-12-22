export default { title: "templates/BookEdit" };

import BookEdit from "./BookEdit";
import { book } from "samples";

const handleTopicClick = console.log;

export const Default = () => (
  <BookEdit book={book} onTopicClick={handleTopicClick} />
);

export const Empty = () => (
  <BookEdit book={null} onTopicClick={handleTopicClick} />
);
