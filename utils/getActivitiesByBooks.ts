import { UserSchema } from "$server/models/user";
import { BookSchema } from "$server/models/book";
import { BookActivitySchema } from "$server/models/bookActivity";
import { CourseBookSchema } from "$server/models/courseBook";

function getActivitiesByBooks({
  learners,
  courseBooks,
  bookActivities,
}: {
  learners: Array<Pick<UserSchema, "id" | "name">>;
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}) {
  const activitiesByBooks: Array<
    Pick<BookSchema, "id" | "name"> & {
      completedCount: number;
      incompletedCount: number;
    }
  > = [];
  for (const book of courseBooks) {
    let completedCount = 0;
    let incompletedCount = 0;
    for (const learner of learners) {
      const topics = book.sections.flatMap(({ topics }) => topics);
      const completedActivities = bookActivities.filter(
        (a) =>
          a.learner.id === learner.id &&
          a.book.id === book.id &&
          a.status === "completed"
      );
      const completedRate = completedActivities.length / topics.length;
      // NOTE: 完了とみなす割合が決め打ち
      completedRate > 0.8 ? completedCount++ : incompletedCount++;
    }
    activitiesByBooks.push({ ...book, completedCount, incompletedCount });
  }
  return activitiesByBooks;
}

export default getActivitiesByBooks;
