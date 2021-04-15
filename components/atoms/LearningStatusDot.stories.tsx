export default { title: "atoms/LearningStatusDot" };

import LearningStatusDot from "./LearningStatusDot";

export const Default = () => (
  <>
    <LearningStatusDot type="completed" />
    <LearningStatusDot type="incompleted" />
    <LearningStatusDot type="unopened" />
  </>
);

export const Tooltip = () => (
  <LearningStatusDot
    type="completed"
    tooltipProps={{ title: "ツールチップ" }}
  />
);

export const Large = () => (
  <>
    <LearningStatusDot type="completed" size="large" />
    <LearningStatusDot type="incompleted" size="large" />
    <LearningStatusDot type="unopened" size="large" />
  </>
);
