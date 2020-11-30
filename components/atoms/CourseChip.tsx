import { ComponentProps } from "react";
import Chip from "@material-ui/core/Chip";

export default function CourseChip(props: ComponentProps<typeof Chip>) {
  return <Chip {...props} variant="outlined" color="primary" />;
}
