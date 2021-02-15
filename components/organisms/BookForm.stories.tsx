import BookForm from "./BookForm";
import { book } from "samples";

export default { title: "organisms/BookForm" };

const defaultProps = { book, onSubmit: console.log };

export const Default = () => <BookForm {...defaultProps} />;
