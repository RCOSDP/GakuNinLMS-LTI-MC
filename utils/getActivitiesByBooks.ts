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
    const topicIds = new Set(
      book.sections.flatMap(({ topics }) => topics).map(({ id }) => id)
    );
    const activities = bookActivities.filter((a) => a.book.id === book.id);
    const learnerIds = new Set(activities.map((a) => a.learner.id));
    let completedCount = 0;
    for (const learnerId of learnerIds) {
      const activitiesByLearner = activities.filter(
        (a) => a.learner.id === learnerId
      );
      if (
        activitiesByLearner.length === topicIds.size &&
        !activitiesByLearner.some(({ status }) => status !== "completed")
      ) {
        completedCount++;
      }
    }
    const incompletedCount = learnerIds.size - completedCount;
    activitiesByBooks.push({ ...book, completedCount, incompletedCount });
  }
  return activitiesByBooks;
}

export default getActivitiesByBooks;
