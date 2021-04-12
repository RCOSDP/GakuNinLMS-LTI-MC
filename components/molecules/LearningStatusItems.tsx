import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";
import type { TopicLearningActivitySchema } from "$server/models/topicLearningActivity";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1.5),
    },
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    "& > :first-child": {
      marginRight: theme.spacing(0.5),
    },
  },
}));

type Props = {
  className?: string;
  learningActivity?: BookLearningActivitySchema | TopicLearningActivitySchema;
  learnerActivities?: LearnerActivitySchema[];
  onLearnerActivityClick?(learnerActivity: LearnerActivitySchema): void;
};

export default function LearningStatusItems(props: Props) {
  const {
    className,
    learningActivity,
    learnerActivities,
    onLearnerActivityClick,
  } = props;
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.item}>
        <LearningStatusDot type="completed" />
        <span>
          完了{learningActivity && `${learningActivity.completedCount}人`}
        </span>
      </div>
      <div className={classes.item}>
        <LearningStatusDot type="incompleted" />
        <span>
          未完了{learningActivity && `${learningActivity.incompletedCount}人`}
        </span>
      </div>
      <div className={classes.item}>
        <LearningStatusDot type="unopened" />
        <span>
          未開封
          {learningActivity &&
            `${
              learningActivity.totalLearnerCount -
              learningActivity.completedCount -
              learningActivity.incompletedCount
            }人`}
        </span>
      </div>
    </div>
  );
}
