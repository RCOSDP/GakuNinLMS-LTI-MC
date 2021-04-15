import clsx from "clsx";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import useSelectorProps from "$utils/useSelectorProps";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";
import type { TopicLearningActivitySchema } from "$server/models/topicLearningActivity";
import type { BookLearnerActivitySchema } from "$server/models/bookLearnerActivity";

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
    "&$clickable": {
      textDecoration: "underline",
    },
  },
  button: {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: theme.spacing(0.5),
    cursor: "pointer",
    "&:disabled": {
      color: "unset",
      cursor: "default",
    },
  },
  clickable: {},
}));

type Props = {
  className?: string;
  learningActivity?: BookLearningActivitySchema | TopicLearningActivitySchema;
  bookLearnerActivities?: BookLearnerActivitySchema[];
  onBookLearnerActivityClick?(learnerActivity: BookLearnerActivitySchema): void;
};

export default function LearningStatusItems(props: Props) {
  const {
    className,
    learningActivity,
    bookLearnerActivities,
    onBookLearnerActivityClick,
  } = props;
  const classes = useStyles();
  const bookLearnerActivitiesMenu = useSelectorProps<BookLearnerActivitySchema>(
    null
  );

  const items = [
    {
      type: "completed",
      label: "完了",
      count: learningActivity?.completedCount,
    },
    {
      type: "incompleted",
      label: "未完了",
      count: learningActivity?.incompletedCount,
    },
    {
      type: "unopened",
      label: "未開封",
      count:
        (learningActivity &&
          learningActivity.totalLearnerCount -
            learningActivity.completedCount -
            learningActivity.incompletedCount) ||
        0,
    },
  ] as const;
  const clickable = bookLearnerActivities && bookLearnerActivities.length > 0;
  const handleLearnerActivityClick = (
    learnerActivity: BookLearnerActivitySchema
  ) => () => {
    onBookLearnerActivityClick?.(learnerActivity);
    bookLearnerActivitiesMenu.onSelect(learnerActivity);
  };

  return (
    <div className={clsx(className, classes.root)}>
      {items.map((item, index) => (
        <button
          key={index}
          aria-controls="book-learner-activities-menu"
          className={clsx(classes.item, classes.button, {
            [classes.clickable]: clickable,
          })}
          disabled={!clickable}
          onClick={bookLearnerActivitiesMenu.onOpen}
        >
          <LearningStatusDot type={item.type} />
          <span>
            {item.label}
            {learningActivity && `${item.count}人`}
          </span>
        </button>
      ))}
      <Menu
        id="book-learner-activities-menu"
        aria-haspopup="true"
        anchorEl={bookLearnerActivitiesMenu.anchorEl}
        open={Boolean(bookLearnerActivitiesMenu.anchorEl)}
        onClose={bookLearnerActivitiesMenu.onClose}
      >
        {bookLearnerActivities &&
          bookLearnerActivities.map((learnerActivity, index) => (
            <MenuItem
              key={index}
              onClick={handleLearnerActivityClick(learnerActivity)}
            >
              {learnerActivity.name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
