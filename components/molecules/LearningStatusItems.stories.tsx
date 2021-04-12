export default { title: "molecules/LearningStatusItems" };

import LearningStatusItems from "./LearningStatusItems";
import { bookLearningActivity } from "$samples";

export const Default = () => (
  <LearningStatusItems learningActivity={bookLearningActivity} />
);

export const Empty = () => <LearningStatusItems />;
