export default { title: "organisms/BookChildren" };

import BookChildren from "./BookChildren";
import bookProps from "samples/bookProps";

const {
  book: { sections },
} = bookProps;
const props = {
  sections,
  onItemClick(_: never, index: [number, number]) {
    console.log({ index });
  },
};

export const Default = () => <BookChildren {...props} />;
