export default { title: "organisms/LearnerActivityDialog" };

import Button from "@material-ui/core/Button";
import LearnerActivityDialog from "./LearnerActivityDialog";
import useDialogProps from "$utils/useDialogProps";
import { user as learner, bookActivity, book, session } from "$samples";
import getLearnerActivities from "$utils/getLearnerActivities";
import type { LearnerActivity } from "$utils/getLearnerActivities";

const courseBooks = [...Array(3)].map((_, id) => ({ ...book, id }));

const [learnerActivity] = getLearnerActivities({
  learners: [...Array(5)].map((_, id) => ({ ...learner, id })),
  bookActivities: [...Array(40)].map((_, i) => ({
    ...bookActivity,
    learner: { ...bookActivity.learner, id: i % 5 },
    book: { ...bookActivity.book, id: Math.floor(Math.random() * 3) },
    topic: { ...bookActivity.topic, id: (i % 3) + 1 },
  })),
  courseBooks,
});

export const Default = () => {
  const { data, dispatch, ...dialogProps } = useDialogProps<LearnerActivity>();
  const handleClick = () => dispatch(learnerActivity);
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        ダイアログ
      </Button>
      {data && (
        <LearnerActivityDialog
          session={session}
          courseBooks={courseBooks}
          learnerActivity={data}
          {...dialogProps}
        />
      )}
    </>
  );
};
