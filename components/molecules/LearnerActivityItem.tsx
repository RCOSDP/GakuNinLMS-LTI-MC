import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import { gray } from "$theme/colors";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";
import type { BookLearnerActivitySchema } from "$server/models/bookLearnerActivity";

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
  learnerActivity: LearnerActivitySchema;
  onBookLearnerActivityClick?(
    bookLearnerActivity: BookLearnerActivitySchema
  ): void;
};

export default function LearnerActivityItem(props: Props) {
  const { learnerActivity, onBookLearnerActivityClick } = props;
  const classes = useStyles();
  const handleBookLearnerActivityClick = (
    bookLearnerActivity: BookLearnerActivitySchema
  ) => () => onBookLearnerActivityClick?.(bookLearnerActivity);

  return (
    <div className={classes.root}>
      <span className={classes.name}>{learnerActivity.name}</span>
      <div className={classes.dots}>
        {learnerActivity.bookLearnerActivities.map((bookLearnerActivity) =>
          bookLearnerActivity.activities.map((activity, index) => (
            <LearningStatusDot
              key={index}
              tooltipProps={{
                title: (
                  <>
                    <p>{learnerActivity.name}</p>
                    <p>{bookLearnerActivity.book.name}</p>
                    <p>{activity.topic.name}</p>
                  </>
                ),
                arrow: true,
              }}
              onClick={handleBookLearnerActivityClick(bookLearnerActivity)}
              type={activity.completed ? "completed" : "incompleted"}
              size="large"
            />
          ))
        )}
      </div>
    </div>
  );
}
