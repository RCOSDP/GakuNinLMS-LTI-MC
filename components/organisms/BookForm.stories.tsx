import BookForm from "./BookForm";
import { book } from "samples";

export default { title: "organisms/BookForm" };

const defaultProps = { book, onSubmit: console.log };

export const Default = () => <BookForm {...defaultProps} />;

export const Update = () => <BookForm variant="update" {...defaultProps} />;
