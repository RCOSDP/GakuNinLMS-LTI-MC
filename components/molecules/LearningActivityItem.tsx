import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import LearningStatusItems from "$molecules/LearningStatusItems";
import { learningStatus, gray } from "$theme/colors";
import useLineClampStyles from "$styles/lineClamp";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";
import type { TopicLearningActivitySchema } from "$server/models/topicLearningActivity";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";

type LearningBargraphProps = {
  className?: string;
  learningActivity: BookLearningActivitySchema | TopicLearningActivitySchema;
};

function LearningBargraph(props: LearningBargraphProps) {
  const {
    className,
    learningActivity: { totalLearnerCount, completedCount, incompletedCount },
  } = props;
  const getPercentage = (value: number): string =>
    `${(value / totalLearnerCount) * 100}%`;
  return (
    <svg className={className} viewBox="0 0 200 10">
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    color: gray[700],
    marginRight: theme.spacing(1),
  },
  graph: {
    maxWidth: 400,
    width: "50%",
    "& > svg": {
      width: "100%",
      marginBottom: theme.spacing(1),
    },
  },
}));

type Props = {
  className?: string;
  learningActivity: BookLearningActivitySchema | TopicLearningActivitySchema;
  learnerActivities: LearnerActivitySchema[];
  onLearnerActivityClick?(learnerActivity: LearnerActivitySchema): void;
};

export default function LearningActivityItem(props: Props) {
  const { learningActivity, learnerActivities, onLearnerActivityClick } = props;
  const classes = useStyles();
  const lineClamp = useLineClampStyles({
    fontSize: "1rem",
    lineClamp: 2,
    lineHeight: 1.375,
  });

  return (
    <div className={classes.root}>
      <div className={clsx(classes.name, lineClamp.placeholder)}>
        <span className={lineClamp.clamp}>{learningActivity.name}</span>
      </div>
      <div className={classes.graph}>
        <LearningBargraph learningActivity={learningActivity} />
        <LearningStatusItems
          learningActivity={learningActivity}
          learnerActivities={learnerActivities}
          onLearnerActivityClick={onLearnerActivityClick}
        />
      </div>
    </div>
  );
}
