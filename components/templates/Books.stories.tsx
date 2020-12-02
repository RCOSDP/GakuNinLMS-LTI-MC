export default { title: "templates/Books" };

import Books from "./Books";
import booksProps from "samples/booksProps";

export const Default = () => <Books {...booksProps} />;
