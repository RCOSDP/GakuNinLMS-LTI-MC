export default { title: "templates/BookEdit" };

import BookEdit from "./BookEdit";
import { book } from "samples";

const handleSubmit = console.log;
const handleDelete = console.log;
const handleAddSection = console.log;
const handleTopicNewClick = () => console.log("onTopicNewClick");
const handlers = {
  onSubmit: handleSubmit,
  onDelete: handleDelete,
  onAddSection: handleAddSection,
  onTopicNewClick: handleTopicNewClick,
};

export const Default = () => <BookEdit book={book} {...handlers} />;

export const Empty = () => <BookEdit book={null} {...handlers} />;
