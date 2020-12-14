export default { title: "organisms/BookAccordion" };

import BookAccordion from "./BookAccordion";
import { book } from "samples";

const props = book;

export const Default = () => {
  return (
    <div>
      {[...Array(10)].map((_value, index) => (
        <BookAccordion key={index} {...props} />
      ))}
    </div>
  );
};
