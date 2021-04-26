export default { title: "molecules/LearnerActivityItem" };

import LearnerActivityItem from "./LearnerActivityItem";
import { bookActivity } from "$samples";

export const Default = () => (
  <LearnerActivityItem
    learner={bookActivity.learner}
    activities={[...Array(10)].map(() => bookActivity)}
  />
);
