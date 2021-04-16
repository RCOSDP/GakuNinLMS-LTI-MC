import { UserSchema } from "$server/models/user";
import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import { BookActivitySchema } from "$server/models/bookActivity";
import { CourseBookSchema } from "$server/models/courseBook";

export function stringify({
  book,
  topic,
}: {
  book: Pick<BookSchema, "id">;
  topic: Pick<TopicSchema, "id">;
}): `${BookSchema["id"]}-${TopicSchema["id"]}` {
  return `${book.id}-${topic.id}` as const;
}

export function parse(
  id: `${BookSchema["id"]}-${TopicSchema["id"]}`
): {
  book: Pick<BookSchema, "id">;
  topic: Pick<TopicSchema, "id">;
} {
  const [bookId, topicId] = id.split("-");
  return { book: { id: Number(bookId) }, topic: { id: Number(topicId) } };
}

function getLearnerActivities({
  learners,
  courseBooks,
  bookActivities,
}: {
  learners: Array<Pick<UserSchema, "id" | "name">>;
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}) {
  const map: Map<
    `${BookSchema["id"]}-${TopicSchema["id"]}`,
    [Pick<BookSchema, "id" | "name">, Pick<TopicSchema, "id" | "name">]
  > = new Map();
  for (const book of courseBooks) {
    for (const topic of book.sections.flatMap(({ topics }) => topics)) {
      map.set(stringify({ book, topic }), [book, topic]);
    }
  }

  const learnerActivities: Array<
    [Pick<UserSchema, "id" | "name">, Array<BookActivitySchema>]
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
      activities.push(
        activity ? activity : { learner, book, topic, status: "unopened" }
      );
    }
    learnerActivities.push([learner, activities]);
  }

  return learnerActivities;
}

export default getLearnerActivities;
