export default { title: "organisms/BookChildren" };

import BookChildren from "./BookChildren";
import { sections } from "samples";

const handlers = {
  onItemClick(_: never, index: ItemIndex) {
    console.log(index);
  },
};

export const Default = () => (
  <BookChildren
    sections={sections}
    index={[0, 0]}
    isTopicEditable={() => false}
    {...handlers}
  />
);

export const Editable = () => (
  <BookChildren
    sections={sections}
    index={[0, 0]}
    isTopicEditable={() => true}
    {...handlers}
    onItemEditClick={console.log}
  />
);
