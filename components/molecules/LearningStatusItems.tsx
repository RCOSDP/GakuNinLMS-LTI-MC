import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";

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
  totalLearnerCount: number;
  completedCount: number;
  incompletedCount: number;
};

export default function LearningStatusItems(props: Props) {
  const {
    className,
    totalLearnerCount,
    completedCount,
    incompletedCount,
  } = props;
  const classes = useStyles();
  // TODO: 学習状況別に学習者一覧を得られるようにしましょう
  // const bookLearnerActivitiesMenu = useSelectorProps<BookLearnerActivitySchema>(
  //   null
  // );

  const items = [
    {
      type: "completed",
      label: "完了",
      count: completedCount,
    },
    {
      type: "incompleted",
      label: "未完了",
      count: incompletedCount,
    },
    {
      type: "unopened",
      label: "未開封",
      count: totalLearnerCount - completedCount - incompletedCount,
    },
  ] as const;
  // TODO: 学習状況別に学習者一覧を得られるようにしましょう
  const clickable = false; // learnerActivities && learnerActivities.length > 0;
  // const handleLearnerActivityClick = (
  //   learnerActivity: BookLearnerActivitySchema
  // ) => () => {
  //   onBookLearnerActivityClick?.(learnerActivity);
  //   bookLearnerActivitiesMenu.onSelect(learnerActivity);
  // };

  return (
    <div className={clsx(className, classes.root)}>
      {items.map((item, index) => (
        <button
          key={index}
          aria-controls="learner-activities-menu"
          className={clsx(classes.item, classes.button, {
            [classes.clickable]: clickable,
          })}
          disabled={!clickable}
          // TODO: 学習状況別に学習者一覧を得られるようにしましょう
          // onClick={bookLearnerActivitiesMenu.onOpen}
        >
          <LearningStatusDot type={item.type} />
          <span>
            {item.label}
            {item.count}人
          </span>
        </button>
      ))}
      {/* TODO: 学習状況別に学習者一覧を得られるようにしましょう */}
      {/* <Menu
        anchorEl={bookLearnerActivitiesMenu.anchorEl}
        open={Boolean(bookLearnerActivitiesMenu.anchorEl)}
        onClose={bookLearnerActivitiesMenu.onClose}
        id="learner-activities-menu"
        aria-haspopup="true"
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
      </Menu> */}
    </div>
  );
}
