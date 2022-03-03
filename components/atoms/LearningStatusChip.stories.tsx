export default { title: "atoms/LearningStatusChip" };

import LearningStatusChip from "./LearningStatusChip";

export const Default = () => (
  <>
    {(["completed", "incompleted", "unopened"] as const).map((type, index) => (
      <LearningStatusChip key={index} type={type} />
    ))}
  </>
);
