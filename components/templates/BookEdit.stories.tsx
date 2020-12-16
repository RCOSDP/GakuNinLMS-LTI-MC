export default { title: "templates/BookEdit" };

import BookEdit from "./BookEdit";
import { book } from "samples";

const props = { book };

export const Default = () => <BookEdit {...props} />;

export const Empty = () => <BookEdit book={null} />;
