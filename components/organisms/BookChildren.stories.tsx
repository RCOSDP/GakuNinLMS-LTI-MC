export default { title: "organisms/BookChildren" };

import BookChildren from "./BookChildren";
import bookProps from "samples/bookProps";

const {
  book: { sections },
} = bookProps;
const props = { sections };

export const Default = () => <BookChildren {...props} />;
