export default { title: "molecules/LearningActivityItem" };

import LearningActivityItem from "./LearningActivityItem";
import { book, bookActivity } from "$samples";

const han = (n: number) =>
  new Intl.NumberFormat("ja-JP-u-nu-hanidec").format(n);
const learner = (id: number) => ({
  id,
  name: `山田 ${han(id)}太郎`,
  email: `yamada${id}@example.com`,
});

export const Default = () => (
  <LearningActivityItem
    book={book}
    learners={[...Array(160)].map((_, id) => learner(id))}
    completedLearners={
      new Map(
        [...Array(50)].map((_, id) => [
          id,
          [...Array(3)].map(() => ({
            ...bookActivity,
            learner: learner(id),
          })),
        ])
      )
    }
    incompletedLearners={
      new Map(
        [...Array(28)].map((_, i) => [
          50 + i,
          [...Array(3)].map(() => ({
            ...bookActivity,
            learner: learner(50 + i),
          })),
        ])
      )
    }
  />
);
