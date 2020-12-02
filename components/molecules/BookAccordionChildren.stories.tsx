export default { title: "molecules/BookAccordionChildren" };

import BookAccordionChildren from "./BookAccordionChildren";
import booksProps from "samples/booksProps";

const {
  books: [{ sections }],
} = booksProps;

const props = { sections };

export const Default = () => {
  return (
    <div>
      <BookAccordionChildren {...props} />
    </div>
  );
};
