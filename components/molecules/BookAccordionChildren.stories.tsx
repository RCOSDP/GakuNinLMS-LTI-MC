export default { title: "molecules/BookAccordionChildren" };

import BookAccordionChildren from "./BookAccordionChildren";
import { sections } from "samples";

const props = {
  sections,
  onItemClick(_: never, index: [number, number]) {
    console.log({ index });
  },
};

export const Default = () => {
  return (
    <div>
      <BookAccordionChildren {...props} />
    </div>
  );
};
