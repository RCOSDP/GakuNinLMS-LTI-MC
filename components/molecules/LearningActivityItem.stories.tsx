export default { title: "molecules/LearningActivityItem" };

import LearningActivityItem from "./LearningActivityItem";
import { bookLearningActivity } from "$samples";

export const Default = () => (
  <LearningActivityItem
    bookLearningActivity={bookLearningActivity}
    onLearnerActivityClick={console.log}
  />
);
