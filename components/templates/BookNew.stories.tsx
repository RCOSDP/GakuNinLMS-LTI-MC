export default { title: "templates/BookNew" };

import BookNew from "./BookNew";
import { book } from "samples";

const onSubmit = console.log;
const props = { book, onSubmit };

export const Default = () => <BookNew {...props} />;

export const Empty = () => <BookNew onSubmit={onSubmit} />;
