export default { title: "templates/Books" };

import Books from "./Books";
import booksProps from "samples/booksProps";

const onBookClick = console.log;

export const Default = () => (
  <Books {...booksProps} onBookClick={onBookClick} />
);
