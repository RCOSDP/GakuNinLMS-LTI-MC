import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";

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
  learnerActivity: LearnerActivitySchema;
};

export default function LearnerActivityItem(props: Props) {
  const { learnerActivity } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.name}>{learnerActivity.name}</span>
      <div className={classes.graph}>
        {learnerActivity.activities.map((activity, index) => (
          <LearningStatusDot
            key={index}
            type={activity.completed ? "completed" : "incompleted"}
          />
        ))}
      </div>
    </div>
  );
}
