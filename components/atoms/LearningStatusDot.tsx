import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { learningStatus } from "$theme/colors";
import type { LearningStatus } from "$server/models/learningStatus";

const useStyles = makeStyles({
  root: {
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
  tooltipProps?: Omit<React.ComponentProps<typeof Tooltip>, "children">;
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
};

export default function LearningStatusDot(props: Props) {
  const { type, size = "default", onClick, tooltipProps } = props;
  const classes = useStyles();
  const handleKeyPress = () => onClick;
  const dotProps = {
    className: clsx(classes.root, classes[type], classes[size]),
    onClick,
    onKeyPress: handleKeyPress,
    role: onClick ? "button" : undefined,
  };
  if (!tooltipProps) return <div {...dotProps} />;
  return (
    <Tooltip {...tooltipProps}>
      <div {...dotProps} />
    </Tooltip>
  );
}
