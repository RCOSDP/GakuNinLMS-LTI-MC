export default { title: "organisms/BookAccordion" };

import BookAccordion from "./BookAccordion";
import booksProps from "samples/booksProps";

const {
  books: [props],
} = booksProps;

export const Default = () => {
  return (
    <div>
      {[...Array(10)].map((_value, index) => (
        <BookAccordion key={index} {...props} />
      ))}
    </div>
  );
};
