import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import { LearnerSchema } from "$server/models/learner";
import { BookActivitySchema } from "$server/models/bookActivity";
import { CourseBookSchema } from "$server/models/courseBook";

export function stringify({
  book,
  topic,
  index,
}: {
  book: Pick<BookSchema, "id">;
  topic: Pick<TopicSchema, "id">;
  index: number;
}): `${BookSchema["id"]}-${TopicSchema["id"]}-${number}` {
  return `${book.id}-${topic.id}-${index}` as const;
}

export function parse(
  id: `${BookSchema["id"]}-${TopicSchema["id"]}-${number}`
): {
  book: Pick<BookSchema, "id">;
  topic: Pick<TopicSchema, "id">;
  index: number;
} {
  const [bookId, topicId, index] = id.split("-");
  return {
    book: { id: Number(bookId) },
    topic: { id: Number(topicId) },
    index: Number(index),
  };
}

function getLearnerActivities({
  learners,
  courseBooks,
  bookActivities,
}: {
  learners: Array<LearnerSchema>;
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}) {
  const map: Map<
    `${BookSchema["id"]}-${TopicSchema["id"]}-${number}`,
    [Pick<BookSchema, "id" | "name">, Pick<TopicSchema, "id" | "name">]
  > = new Map();
  for (const book of courseBooks) {
    book.sections
      .flatMap(({ topics }) => topics)
      .forEach((topic, index) => {
        map.set(stringify({ book, topic, index }), [book, topic]);
      });
  }

  const learnerActivities: Array<
    [LearnerSchema, Array<BookActivitySchema>]
  > = [];
  for (const learner of learners) {
    const activityByLearner = bookActivities.filter(
      (a) => a.learner.id === learner.id
    );
    const activities: BookActivitySchema[] = [];
    for (const [id, [book, topic]] of map) {
      const {
        book: { id: bookId },
        topic: { id: topicId },
      } = parse(id);
      const activity = activityByLearner.find(
        (a) => a.book.id === bookId && a.topic.id === topicId
      );
      activities.push(activity || { learner, book, topic, status: "unopened" });
    }
    learnerActivities.push([learner, activities]);
  }

  return learnerActivities;
}

export default getLearnerActivities;
