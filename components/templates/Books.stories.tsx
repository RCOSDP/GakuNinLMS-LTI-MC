export default { title: "templates/Books" };

import Books from "./Books";
import { books } from "samples";

const props = { books };
const onBookClick = console.log;

export const Default = () => <Books {...props} onBookClick={onBookClick} />;
