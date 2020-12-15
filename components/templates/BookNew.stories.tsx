export default { title: "templates/BookNew" };

import BookNew from "./BookNew";
import { Book } from "types/book";
import { book } from "samples";

const props = { book };

export const Default = () => <BookNew {...props} />;

export const Empty = () => <BookNew book={{} as Book} />;
