import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import LearningStatusItems from "$molecules/LearningStatusItems";
import { learningStatus, gray } from "$theme/colors";
import useLineClampStyles from "$styles/lineClamp";
import type { ActivitiesByTopicSchema } from "$server/models/activitiesByTopic";

type LearningBargraphProps = {
  className?: string;
  totalLearnerCount: number;
  activitiesByTopic: ActivitiesByTopicSchema;
};

function LearningBargraph(props: LearningBargraphProps) {
  const {
    className,
    totalLearnerCount,
    activitiesByTopic: { activities, completedCount },
  } = props;
  const incompletedCount = activities.length - completedCount;
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
  totalLearnerCount: number;
  activitiesByTopic: ActivitiesByTopicSchema;
};

export default function LearningActivityItem(props: Props) {
  const { totalLearnerCount, activitiesByTopic } = props;
  const classes = useStyles();
  const lineClamp = useLineClampStyles({
    fontSize: "1rem",
    lineClamp: 2,
    lineHeight: 1.375,
  });

  return (
    <div className={classes.root}>
      <div className={clsx(classes.name, lineClamp.placeholder)}>
        <span className={lineClamp.clamp}>{activitiesByTopic.name}</span>
      </div>
      <div className={classes.graph}>
        <LearningBargraph
          totalLearnerCount={totalLearnerCount}
          activitiesByTopic={activitiesByTopic}
        />
        <LearningStatusItems
          totalLearnerCount={totalLearnerCount}
          completedCount={activitiesByTopic.completedCount}
          incompletedCount={
            activitiesByTopic.activities.length -
            activitiesByTopic.completedCount
          }
          // TODO: ひとりの学習者のトピックの学習状況が一覧されるダイアログを実装する
          // onBookLearnerActivityClick={onBookLearnerActivityClick}
        />
      </div>
    </div>
  );
}
