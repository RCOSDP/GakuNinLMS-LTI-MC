export default { title: "organisms/BookEditChildren" };

import BookEditChildren from "./BookEditChildren";
import { sections } from "samples";

const handleTopicClick = console.log;

export const Default = () => (
  <BookEditChildren sections={sections} onTopicClick={handleTopicClick} />
);
