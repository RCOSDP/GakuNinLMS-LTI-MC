export default { title: "molecules/LearnerActivityItem" };

import LearnerActivityItem from "./LearnerActivityItem";
import { learnerActivity } from "$samples";

export const Default = () => (
  <LearnerActivityItem learnerActivity={learnerActivity} />
);
