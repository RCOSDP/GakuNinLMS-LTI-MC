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
          <p>学習者: {activity.learner.name}</p>
          <p>ブック: {activity.book.name}</p>
          <p>トピック: {activity.topic.name}</p>
          <p>ステータス: {label[activity.status]}</p>
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
