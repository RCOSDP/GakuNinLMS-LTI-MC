export default { title: "molecules/LearningStatusItems" };

import LearningStatusItems from "./LearningStatusItems";

export const Default = () => (
  <LearningStatusItems
    totalLearnerCount={160}
    completedCount={50}
    incompletedCount={28}
  />
);
