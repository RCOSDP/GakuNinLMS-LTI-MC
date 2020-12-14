export default { title: "organisms/BookAccordion" };

import BookAccordion from "./BookAccordion";
import { book } from "samples";

const props = book;

const handleTopicClick = console.log;

export const Default = () => {
  return (
    <div>
      {[...Array(10)].map((_value, index) => (
        <BookAccordion key={index} {...props} onTopicClick={handleTopicClick} />
      ))}
    </div>
  );
};
