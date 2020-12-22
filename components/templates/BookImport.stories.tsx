export default { title: "templates/BookImport" };

import BookImport from "./BookImport";
import { books } from "samples";

const handleTopicClick = console.log;

export const Default = () => (
  <BookImport books={books} onTopicClick={handleTopicClick} />
);

export const Empty = () => (
  <BookImport books={[]} onTopicClick={handleTopicClick} />
);
