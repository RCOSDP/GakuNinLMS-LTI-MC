export default { title: "molecules/BookAccordionChildren" };

import BookAccordionChildren from "./BookAccordionChildren";
import { sections } from "samples";

const props = { sections };

export const Default = () => {
  return (
    <div>
      <BookAccordionChildren {...props} />
    </div>
  );
};
