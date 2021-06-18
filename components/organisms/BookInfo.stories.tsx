export default { title: "organisms/BookInfo" };

import BookInfo from "./BookInfo";
import { book } from "$samples";

export const Default = () => <BookInfo book={book} />;
