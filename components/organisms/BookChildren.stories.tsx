export default { title: "organisms/BookChildren" };

import BookChildren from "./BookChildren";
import { sections } from "samples";

const props = { sections };

export const Default = () => <BookChildren {...props} />;
