import BookForm from "./BookForm";
import { book } from "samples";

export default { title: "organisms/BookForm" };

const props = { book, onSubmit: console.log };

export const Default = () => <BookForm {...props} />;
