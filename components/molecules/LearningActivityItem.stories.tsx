export default { title: "molecules/LearningActivityItem" };

import LearningActivityItem from "./LearningActivityItem";
import { activitiesByTopic } from "$samples";

export const Default = () => (
  <LearningActivityItem
    totalLearnerCount={160}
    activitiesByTopic={activitiesByTopic}
  />
);
