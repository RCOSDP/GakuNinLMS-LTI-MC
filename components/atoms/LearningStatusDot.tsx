import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { learningStatus } from "$theme/colors";
import type { LearningStatus } from "$server/models/learningStatus";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    borderRadius: 4,
    "&$completed": {
      backgroundColor: learningStatus["completed"],
    },
    "&$incompleted": {
      backgroundColor: learningStatus["incompleted"],
    },
    "&$unopened": {
      backgroundColor: learningStatus["unopened"],
    },
    "&$default": {
      width: 12,
      height: 12,
    },
    "&$large": {
      width: 16,
      height: 16,
    },
  },
  completed: {},
  incompleted: {},
  unopened: {},
  default: {},
  large: {},
});

type Props = {
  type: LearningStatus;
  size?: "default" | "large";
};

export default function LearningStatusDot(props: Props) {
  const { type, size = "default" } = props;
  const classes = useStyles();
  return <div className={clsx(classes.root, classes[type], classes[size])} />;
}
