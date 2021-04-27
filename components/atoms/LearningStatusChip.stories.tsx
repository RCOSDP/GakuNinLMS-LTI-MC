export default { title: "atoms/LearningStatusChip" };

import type { LearningStatus } from "$server/models/learningStatus";
import LearningStatusChip from "./LearningStatusChip";

export const Default = () => (
  <>
    {(["completed", "incompleted", "unopened"] as const).map(
      (type, index) => (
        <LearningStatusChip key={index} type={type} />
      )
    )}
  </>
);
