import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { learningStatus } from "$theme/colors";
import type { LearningStatus } from "$server/models/learningStatus";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    width: 12,
    height: 12,
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
  },
  completed: {},
  incompleted: {},
  unopened: {},
});

type Props = {
  type: LearningStatus;
};

export default function LearningStatusDot(props: Props) {
  const { type } = props;
  const classes = useStyles();
  return <div className={clsx(classes.root, classes[type])} />;
}
