import { BookSchema } from "$server/models/book";
import { BookActivitySchema } from "$server/models/bookActivity";
import { CourseBookSchema } from "$server/models/courseBook";

function getActivitiesByBooks({
  courseBooks,
  bookActivities,
}: {
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
    const activities = bookActivities.filter((a) => a.book.id === book.id);
    const learnerIds = new Set(activities.map((a) => a.learner.id));
    let completedCount = 0;
    for (const learnerId of learnerIds) {
      const topics = book.sections.flatMap(({ topics }) => topics);
      const completedActivities = activities.filter(
        (a) => a.learner.id === learnerId && a.status === "completed"
      );
      const completedRate = completedActivities.length / topics.length;
      // TODO: 完了とみなす割合が決め打ちなので外部化しましょう
      if (completedRate > 0.8) completedCount++;
    }
    const incompletedCount = learnerIds.size - completedCount;
    activitiesByBooks.push({ ...book, completedCount, incompletedCount });
  }
  return activitiesByBooks;
}

export default getActivitiesByBooks;
