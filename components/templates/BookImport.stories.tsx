export default { title: "templates/BookImport" };

import BookImport from "./BookImport";
import { books } from "samples";

const props = { books };

export const Default = () => <BookImport {...props} />;

export const Empty = () => <BookImport books={[]} />;
