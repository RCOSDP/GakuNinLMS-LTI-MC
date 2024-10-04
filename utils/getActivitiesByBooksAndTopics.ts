import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { CourseBookSchema } from "$server/models/courseBook";

function round(number: number) {
  return Math.round(number * 10) / 10;
}

function getActivitiesByBooksAndTopics({
  courseBooks,
  bookActivities,
}: {
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}) {
  const activitiesByTopics: Array<
    Pick<TopicSchema, "id" | "name" | "timeRequired"> & {
      averageTime: number;
      timeRatio: number;
    }
  > = [];

  const activitiesByBooksAndTopics: Array<
    Pick<BookSchema, "id" | "name"> & {
      activitiesByTopics: Array<
        Pick<TopicSchema, "id" | "name" | "timeRequired"> & {
          averageTime: number;
          timeRatio: number;
        }
      >;
    }
  > = [];

  for (const book of courseBooks) {
    activitiesByTopics.splice(0);
    const topics: Array<Pick<TopicSchema, "id" | "name" | "timeRequired">> =
      book.sections.map((section) => section.topics).flat();
    for (const topic of topics) {
      const activities = bookActivities.filter(
        (a: BookActivitySchema) =>
          a.book.id === book.id && a.topic.id === topic.id
      );
      const totalTimeMs =
        activities
          .map((a: BookActivitySchema) => a.totalTimeMs ?? 0)
          .reduce((a, b) => {return a + b}, 0) ?? 0;
      const averageTime = activities.length > 0 ? round(totalTimeMs / activities.length / 1000) : 0;
      const timeRatio = round(totalTimeMs / 1000 / topic?.timeRequired) ?? 0;

      activitiesByTopics.push({ ...topic, averageTime, timeRatio });
    }
    activitiesByBooksAndTopics.push({ ...book, activitiesByTopics });
  }

  return activitiesByBooksAndTopics;
}

export default getActivitiesByBooksAndTopics;
