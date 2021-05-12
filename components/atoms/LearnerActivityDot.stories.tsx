export default { title: "atoms/LearnerActivityDot" };

import LearnerActivityDot from "./LearnerActivityDot";
import { bookActivity } from "$samples";

export const Default = () => (
  <LearnerActivityDot activity={bookActivity} onActivityClick={console.log} />
);
