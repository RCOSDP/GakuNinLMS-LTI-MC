export default { title: "templates/BookNew" };

import BookNew from "./BookNew";
import { book } from "samples";

const props = { book, onSubmit: console.log };

export const Default = () => <BookNew {...props} />;

export const Empty = () => <BookNew book={null} />;
