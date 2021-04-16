import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import { gray } from "$theme/colors";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { UserSchema } from "$server/models/user";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    flexShrink: 0,
    color: gray[700],
    fontSize: "1rem",
    width: "10rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginRight: "1rem",
  },
  dots: {
    whiteSpace: "nowrap",
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

type Props = {
  learner: Pick<UserSchema, "name">;
  activities: Array<BookActivitySchema>;
  onLearnerActivityClick?(activity: BookActivitySchema): void;
};

export default function LearnerActivityItem(props: Props) {
  const { learner, activities, onLearnerActivityClick } = props;
  const classes = useStyles();
  const handleActivityClick = (activity: BookActivitySchema) => () =>
    onLearnerActivityClick?.(activity);

  return (
    <div className={classes.root}>
      <span className={classes.name}>{learner.name}</span>
      <div className={classes.dots}>
        {activities.map((activity, index) => (
          <LearningStatusDot
            key={index}
            tooltipProps={{
              title: (
                <>
                  <p>{activity.learner.name}</p>
                  <p>{activity.book.name}</p>
                  <p>{activity.topic.name}</p>
                </>
              ),
              arrow: true,
            }}
            onClick={handleActivityClick(activity)}
            type={activity.status}
            size="large"
          />
        ))}
      </div>
    </div>
  );
}
