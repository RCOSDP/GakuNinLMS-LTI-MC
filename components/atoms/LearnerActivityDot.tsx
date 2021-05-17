import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import LearningStatusDot from "$atoms/LearningStatusDot";
import label from "$utils/learningStatusLabel";
import type { BookActivitySchema } from "$server/models/bookActivity";

const useStyles = makeStyles((theme) => ({
  button: {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
  },
  descriptionList: {
    "& > div": {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(0.5, 0),
    },
    "& dt, & dd": {
      margin: 0,
    },
  },
  delimiter: {
    marginRight: theme.spacing(0.5),
  },
}));

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
        <dl className={classes.descriptionList}>
          <div>
            <dt>
              学習者
              <span className={classes.delimiter} aria-hidden>
                :
              </span>
            </dt>
            <dd>{activity.learner.name}</dd>
          </div>
          <div>
            <dt>
              ブック
              <span className={classes.delimiter} aria-hidden>
                :
              </span>
            </dt>
            <dd>{activity.book.name}</dd>
          </div>
          <div>
            <dt>
              トピック
              <span className={classes.delimiter} aria-hidden>
                :
              </span>
            </dt>
            <dd>{activity.topic.name}</dd>
          </div>
          <div>
            <dt>
              ステータス
              <span className={classes.delimiter} aria-hidden>
                :
              </span>
            </dt>
            <dd>{label[activity.status]}</dd>
          </div>
        </dl>
      }
      arrow
    >
      <button className={classes.button} onClick={handleActivityClick}>
        <LearningStatusDot status={activity.status} size="large" />
      </button>
    </Tooltip>
  );
}
