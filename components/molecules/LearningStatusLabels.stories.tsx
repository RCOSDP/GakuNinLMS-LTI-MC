export default { title: "molecules/LearningStatusLabels" };

import LearningStatusLabels from "./LearningStatusLabels";

const han = (n: number) =>
  new Intl.NumberFormat("ja-JP-u-nu-hanidec").format(n);
const learner = (id: number) => ({ id, name: `山田 ${han(id)}太郎` });

export const Default = () => (
  <LearningStatusLabels
    learners={[...Array(160)].map((_, id) => learner(id))}
    completedLearners={[...Array(50)].map((_, id) => learner(id))}
    incompletedLearners={[...Array(28)].map((_, i) => learner(50 + i))}
  />
);
