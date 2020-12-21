export default { title: "atoms/CourseChip" };

import CourseChip from "./CourseChip";
import { ltiResourceLink } from "$samples";

export const Default = () => <CourseChip ltiResourceLink={ltiResourceLink} />;
