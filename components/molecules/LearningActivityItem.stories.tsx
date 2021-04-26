export default { title: "molecules/LearningActivityItem" };

import LearningActivityItem from "./LearningActivityItem";
import { activitiesByBook } from "$samples";

export const Default = () => (
  <LearningActivityItem
    totalLearnerCount={160}
    activitiesByBook={activitiesByBook}
  />
);
