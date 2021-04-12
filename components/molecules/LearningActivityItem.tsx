import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import { learningStatus } from "$theme/colors";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";
import type { TopicLearningActivitySchema } from "$server/models/topicLearningActivity";

function LearningBargraph(
  props: BookLearningActivitySchema | TopicLearningActivitySchema
) {
  const { totalLearnerCount, completedCount, incompletedCount } = props;
  const getPercentage = (value: number): string =>
    `${(value / totalLearnerCount) * 100}%`;
  return (
    <svg viewBox="0 0 200 10">
      <rect
        x="0"
        y="0"
        width={getPercentage(completedCount)}
        height="100%"
        fill={learningStatus["completed"]}
      />
      <rect
        x={getPercentage(completedCount)}
        y="0"
        width={getPercentage(incompletedCount)}
        height="100%"
        fill={learningStatus["incompleted"]}
      />
      <rect
        x={getPercentage(completedCount + incompletedCount)}
        y="0"
        width={getPercentage(
          totalLearnerCount - completedCount - incompletedCount
        )}
        height="100%"
        fill={learningStatus["unopened"]}
      />
    </svg>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  name: {
    flex: 1,
  },
  graph: { maxWidth: "50%" },
});

type Props = {
  learningActivity: BookLearningActivitySchema | TopicLearningActivitySchema;
};

export default function LearningActivityItem(props: Props) {
  const { learningActivity } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.name}>{learningActivity.name}</span>
      <div className={classes.graph}>
        <LearningBargraph {...learningActivity} />
        <div>
          <LearningStatusDot type="completed" />
          <span>完了{learningActivity.completedCount}人</span>
          <LearningStatusDot type="incompleted" />
          <span>未完了{learningActivity.incompletedCount}人</span>
          <LearningStatusDot type="unopened" />
          <span>
            未開封
            {learningActivity.totalLearnerCount -
              learningActivity.completedCount -
              learningActivity.incompletedCount}
            人
          </span>
        </div>
      </div>
    </div>
  );
}
