import type { BookActivitySchema } from "$server/models/bookActivity";
import type { CourseBookSchema } from "$server/models/courseBook";

function getActivitiesEachCourseBooks({
  courseBooks,
  bookActivities,
}: {
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}) {
  const activitiesEachCourseBooks: Array<
    [
      Pick<CourseBookSchema, "id" | "name">,
      Array<Omit<BookActivitySchema, "learner" | "book">>
    ]
  > = [];
  for (const book of courseBooks) {
    const activities = bookActivities.filter((a) => a.book.id === book.id);
    if (activities.length === 0) continue;
    activitiesEachCourseBooks.push([book, activities]);
  }
  return activitiesEachCourseBooks;
}

export default getActivitiesEachCourseBooks;
