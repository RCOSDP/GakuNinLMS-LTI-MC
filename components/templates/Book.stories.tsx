export default { title: "templates/Book" };

import Book from "./Book";
import { book } from "samples";

const props = { book };

export const Default = () => <Book {...props} />;
