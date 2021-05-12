import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { learningStatus } from "$theme/colors";
import label from "$utils/learningStatusLabel";
import type { LearningStatus } from "$server/models/learningStatus";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    display: "block",
    borderRadius: 4,
    "&$completed": {
      backgroundColor: learningStatus["completed"],
    },
    "&$incompleted": {
      backgroundColor: learningStatus["incompleted"],
    },
    "&$unopened": {
      backgroundColor: learningStatus["unopened"],
      // NOTE: ページ背景色とのコントラストが十分でないので枠線で視認性を向上する
      border: "1px solid",
      borderColor: grey[400],
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
  status: LearningStatus;
  size?: "default" | "large";
};

export default function LearningStatusDot(props: Props) {
  const { status, size = "default" } = props;
  const classes = useStyles();
  return (
    <span
      role="img"
      aria-label={label[status]}
      className={clsx(classes.root, classes[status], classes[size])}
    />
  );
}
