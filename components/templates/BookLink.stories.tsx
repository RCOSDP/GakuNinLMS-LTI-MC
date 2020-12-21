export default { title: "templates/BookLink" };

import BookLink from "./BookLink";
import { books } from "samples";

const props = { books };

export const Default = () => <BookLink {...props} />;

export const Empty = () => <BookLink books={[]} />;
