export default { title: "templates/BookEdit" };

import BookEdit from "./BookNew";
import { book } from "samples";

const props = { book };

export const Default = () => <BookEdit {...props} />;
