export default { title: "organisms/BookAccordion" };

import BookAccordion from "./BookAccordion";
import { book } from "samples";

const defaultProps = {
  book,
  onEditClick: console.log,
  onTopicClick: console.log,
};

export const Default = () => (
  <div>
    {[...Array(10)].map((_value, index) => (
      <BookAccordion key={index} {...defaultProps} />
    ))}
  </div>
);

export const Editable = () => (
  <div>
    {[...Array(10)].map((_value, index) => (
      <BookAccordion
        key={index}
        {...defaultProps}
        onTopicEditClick={console.log}
        isContentEditable={() => true}
      />
    ))}
  </div>
);
