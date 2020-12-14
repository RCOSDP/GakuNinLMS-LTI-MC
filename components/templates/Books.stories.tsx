export default { title: "templates/Books" };

import Books from "./Books";
import { books } from "samples";

const props = { books };

export const Default = () => <Books {...props} />;
