import Chip from "@material-ui/core/Chip";
import type { ChipProps } from "@material-ui/core/Chip";
import { learningStatus } from "$theme/colors";
import { makeStyles } from "@material-ui/core/styles";
import type { LearningStatus } from "$server/models/learningStatus";

type StyleProps = {
  type: LearningStatus;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: ({ type }: StyleProps) => learningStatus[type],
    color: ({ type }: StyleProps) =>
      theme.palette.getContrastText(learningStatus[type]),
  },
}));

type Props<Element extends React.ElementType> = ChipProps<
  Element,
  {
    type: LearningStatus;
  }
>;

const label: Readonly<{ [key in LearningStatus]: string }> = {
  completed: "完了",
  incompleted: "未完了",
  unopened: "未開封",
};

export default function LearningStatusChip<Element extends React.ElementType>(
  props: Props<Element>
) {
  const { type, ...other } = props;
  const classes = useStyles({ type });
  return <Chip className={classes.root} label={label[type]} {...other} />;
}
