export default { title: "templates/BookNew" };

import BookNew from "./BookNew";
import { book } from "samples";

const onSubmit = console.log;
const onCancel = () => console.log("back");
const props = { book, onSubmit, onCancel };

export const Default = () => <BookNew {...props} />;

export const Empty = () => <BookNew {...props} book={null} />;
