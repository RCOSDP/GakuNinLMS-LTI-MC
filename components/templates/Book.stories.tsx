export default { title: "templates/Book" };

import Book from "./Book";
import props from "samples/bookProps";

export const Default = () => <Book {...props} />;
