export default { title: "templates/BookNew" };

import BookNew from "./BookNew";
import { book } from "samples";

const onSubmit = console.log;
const onCancel = () => console.log("back");
const defaultProps = { book, onSubmit, onCancel };

export const Default = () => <BookNew {...defaultProps} />;

export const Empty = () => <BookNew {...defaultProps} book={null} />;
