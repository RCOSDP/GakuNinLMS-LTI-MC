import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import LearningStatusDot from "$atoms/LearningStatusDot";
import label from "$utils/learningStatusLabel";
import type { BookActivitySchema } from "$server/models/bookActivity";

const useStyles = makeStyles({
  button: {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
  },
});

type Props = {
  activity: BookActivitySchema;
  onActivityClick?(activity: BookActivitySchema): void;
};

export default function LearnerActivityDot(props: Props) {
  const { activity, onActivityClick } = props;
  const classes = useStyles();
  const handleActivityClick = () => onActivityClick?.(activity);
  return (
    <Tooltip
      title={
        <>
          <p>{activity.learner.name}</p>
          <p>{activity.book.name}</p>
          <p>{activity.topic.name}</p>
          <p>{label[activity.status]}</p>
        </>
      }
      arrow
    >
      <button className={classes.button} onClick={handleActivityClick}>
        <LearningStatusDot status={activity.status} size="large" />
      </button>
    </Tooltip>
  );
}
