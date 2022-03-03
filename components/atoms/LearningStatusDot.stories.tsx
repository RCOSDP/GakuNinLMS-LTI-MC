export default { title: "atoms/LearningStatusDot" };

import LearningStatusDot from "./LearningStatusDot";

export const Default = () => (
  <>
    <LearningStatusDot status="completed" />
    <LearningStatusDot status="incompleted" />
    <LearningStatusDot status="unopened" />
  </>
);

export const Large = () => (
  <>
    <LearningStatusDot status="completed" size="large" />
    <LearningStatusDot status="incompleted" size="large" />
    <LearningStatusDot status="unopened" size="large" />
  </>
);
