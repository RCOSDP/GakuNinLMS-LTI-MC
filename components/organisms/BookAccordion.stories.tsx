export default { title: "organisms/BookAccordion" };

import BookAccordion from "./BookAccordion";
import booksProps from "samples/booksProps";

const {
  books: [props],
} = booksProps;

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
