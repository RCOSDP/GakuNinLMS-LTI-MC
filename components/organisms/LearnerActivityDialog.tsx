import { useMemo, Fragment } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import LearningStatusChip from "$atoms/LearningStatusChip";
import getActivitiesEachCourseBooks from "$utils/getActivitiesEachCourseBooks";
import type { LearnerActivity } from "$utils/getLearnerActivities";
import type { SessionSchema } from "$server/models/session";
import type { CourseBookSchema } from "$server/models/courseBook";
import { gray } from "$theme/colors";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  bookTitle: {
    marginTop: theme.spacing(2),
  },
  topic: {
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
    "& > :first-child": {
      color: gray[900],
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    "&> :nth-child(3)": {
      color: gray[700],
    },
  },
}));

type Props = {
  session: SessionSchema;
  courseBooks: Array<CourseBookSchema>;
  learnerActivity: LearnerActivity;
  open: boolean;
  onClose: React.MouseEventHandler;
};

export default function LearnerActivityDialog(props: Props) {
  const {
    session,
    courseBooks,
    learnerActivity: [learner, bookActivities],
    open,
    onClose,
  } = props;
  const classes = useStyles();
  const activitiesEachCourseBooks = useMemo(
    () =>
      getActivitiesEachCourseBooks({
        courseBooks,
        bookActivities,
      }),
    [courseBooks, bookActivities]
  );
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography variant="h5" component="p">
          {learner.name}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {session.ltiLaunchBody.context_title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {activitiesEachCourseBooks.map(([book, activities], index) => (
          <Fragment key={index}>
            <Typography className={classes.bookTitle} variant="h6">
              {book.name}
            </Typography>
            {activities.map((activity, index) => (
              <Fragment key={index}>
                <p className={classes.topic}>
                  <span>{activity.topic.name}</span>
                  <LearningStatusChip
                    type={activity.status}
                    size="small"
                    component="span"
                  />
                  {activity.updatedAt && (
                    <span>
                      {format(activity.updatedAt, "yoMMMdo", {
                        locale: ja,
                      })}
                    </span>
                  )}
                </p>
              </Fragment>
            ))}
            <Divider />
          </Fragment>
        ))}
      </DialogContent>
    </Dialog>
  );
}
