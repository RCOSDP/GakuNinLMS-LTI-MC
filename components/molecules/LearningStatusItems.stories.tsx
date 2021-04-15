export default { title: "molecules/LearningStatusItems" };

import LearningStatusItems from "./LearningStatusItems";
import { bookLearningActivity, bookLearnerActivity } from "$samples";

export const Default = () => (
  <LearningStatusItems
    learningActivity={bookLearningActivity}
    bookLearnerActivities={[bookLearnerActivity]}
  />
);

export const Empty = () => <LearningStatusItems />;
