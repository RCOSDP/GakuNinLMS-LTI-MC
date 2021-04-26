export default { title: "organisms/BookChildren" };

import BookChildren from "./BookChildren";
import { sections, user } from "samples";
import { useActivityAtom } from "$store/activity";

const handlers = {
  onItemClick(_: never, index: ItemIndex) {
    console.log(index);
  },
};

const activityBySections = sections
  .flatMap(({ topics }) => topics)
  .map((topic) => ({
    topic,
    learner: user,
    completed: Math.floor(Math.random() * 2) === 0,
    totalTimeMs: 100_000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export const Default = () => {
  useActivityAtom(activityBySections);

  return (
    <BookChildren
      sections={sections}
      index={[0, 0]}
      isTopicEditable={() => false}
      {...handlers}
    />
  );
};

export const Editable = () => (
  <BookChildren
    sections={sections}
    index={[0, 0]}
    isTopicEditable={() => true}
    {...handlers}
    onItemEditClick={console.log}
  />
);
