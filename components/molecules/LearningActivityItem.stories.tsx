export default { title: "molecules/LearningActivityItem" };

import LearningActivityItem from "./LearningActivityItem";
import { bookLearningActivity, learnerActivity } from "$samples";

export const Default = () => (
  <LearningActivityItem
    learningActivity={bookLearningActivity}
    learnerActivities={[learnerActivity]}
    onLearnerActivityClick={console.log}
  />
);
