export default { title: "organisms/LearnerActivityDialog" };

import Button from "@mui/material/Button";
import LearnerActivityDialog from "./LearnerActivityDialog";
import useDialogProps from "$utils/useDialogProps";
import { user as learner, bookActivity, book } from "$samples";
import getLearnerActivities from "$utils/getLearnerActivities";

const courseBooks = [...Array(3)].map((_, id) => ({ ...book, id }));

const [[, bookActivities]] = getLearnerActivities({
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
  const { data, dispatch, ...dialogProps } = useDialogProps<true>();
  const handleClick = () => dispatch(true);
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        ダイアログ
      </Button>
      {data && (
        <LearnerActivityDialog
          courseTitle="2021年度 講義1"
          courseBooks={courseBooks}
          learner={learner}
          bookActivities={bookActivities}
          {...dialogProps}
        />
      )}
    </>
  );
};
