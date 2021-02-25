export default { title: "templates/BookNew" };

import BookNew from "./BookNew";
import { book } from "samples";

const onSubmit = console.log;
const onCancel = () => console.log("back");
const defaultProps = { onSubmit, onCancel };

export const Default = () => <BookNew book={book} {...defaultProps} />;

export const Empty = () => <BookNew {...defaultProps} />;
