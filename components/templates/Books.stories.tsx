export default { title: "templates/Books" };

import Books from "./Books";
import { books } from "samples";

const props = {
  books,
  onBookClick: console.log,
  onBookEditClick: console.log,
  onBookNewClick() {
    console.log("onBookNewClick");
  },
};

export const Default = () => <Books {...props} />;

export const Empty = () => (
  <Books
    books={[]}
    onBookClick={props.onBookClick}
    onBookEditClick={props.onBookEditClick}
    onBookNewClick={props.onBookNewClick}
  />
);
