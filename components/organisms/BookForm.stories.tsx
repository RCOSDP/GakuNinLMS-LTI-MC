import BookForm from "./BookForm";
import { book } from "samples";

export default { title: "organisms/BookForm" };

const props = { book };

export const Default = () => <BookForm {...props} />;
