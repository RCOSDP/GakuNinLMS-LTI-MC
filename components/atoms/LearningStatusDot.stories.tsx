export default { title: "atoms/LearningStatusDot" };

import LearningStatusDot from "./LearningStatusDot";

export const Default = () => (
  <>
    <LearningStatusDot type="completed" />
    <LearningStatusDot type="incompleted" />
    <LearningStatusDot type="unopened" />
  </>
);
