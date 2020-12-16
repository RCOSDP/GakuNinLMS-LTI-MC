export default { title: "templates/BookEdit" };

import BookEdit from "./BookEdit";
import { Book } from "types/book";
import { book } from "samples";

const props = { book };

export const Default = () => <BookEdit {...props} />;

export const Empty = () => <BookEdit book={{} as Book} />;
