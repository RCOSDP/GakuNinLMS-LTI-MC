export default { title: "templates/BookEdit" };

import BookEdit from "./BookEdit";
import { book } from "samples";

const handleSubmit = console.log;
const handleDelete = console.log;

export const Default = () => (
  <BookEdit book={book} onSubmit={handleSubmit} onDelete={handleDelete} />
);

export const Empty = () => (
  <BookEdit book={null} onSubmit={handleSubmit} onDelete={handleDelete} />
);
