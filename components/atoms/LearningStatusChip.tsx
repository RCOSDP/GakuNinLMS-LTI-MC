import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import { learningStatus } from "$theme/colors";
import makeStyles from "@mui/styles/makeStyles";
import label from "$utils/learningStatusLabel";
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

export default function LearningStatusChip<Element extends React.ElementType>(
  props: Props<Element>
) {
  const { type, ...other } = props;
  const classes = useStyles({ type });
  return <Chip className={classes.root} label={label[type]} {...other} />;
}
