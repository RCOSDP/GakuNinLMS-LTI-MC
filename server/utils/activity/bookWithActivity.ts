import sortedIndexOf from "lodash.sortedindexof";
import type { UserSchema } from "$server/models/user";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { CourseBookSchema } from "$server/models/courseBook";
import type { ActivitySchema } from "$server/models/activity";
import type { BookWithTopics } from "$server/utils/book/bookToBookSchema";
import { bookToBookSchema } from "$server/utils/book/bookToBookSchema";
import getDisplayableBook from "$server/utils/getDisplayableBook";
import contentBy from "$server/utils/contentBy";
import isCompleted from "./isCompleted";

function bookToCourseBook(
  user: Pick<UserSchema, "id">,
  book: BookWithTopics,
  ip: string
) {
  const courseBook = getDisplayableBook(bookToBookSchema(book, ip), (content) =>
    contentBy(content, user)
  );

  return courseBook;
}

/** BookActivitySchema への変換 - 引数の books は book.id 昇順でなければならない */
export function toSchema({
  user,
  ltiResourceLinks,
  activities,
  books,
  ip,
}: {
  user: Pick<UserSchema, "id">;
  ltiResourceLinks: Array<Pick<LtiResourceLinkSchema, "bookId">>;
  activities: Array<
    Pick<
      ActivitySchema,
      "learner" | "topic" | "totalTimeMs" | "createdAt" | "updatedAt"
    >
  >;
  books: Array<BookWithTopics>;
  ip: string;
}): {
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
} {
  const sortedBooks: Array<BookWithTopics> = [];
  const booksMap = new Map(books.map((book) => [book.id, book] as const));
  const ids = [...booksMap.keys()];
  for (const { bookId } of ltiResourceLinks) {
    const id = ids[sortedIndexOf(ids, bookId)];
    const book = booksMap.get(id);
    if (!book) continue;
    sortedBooks.push(book);
    booksMap.delete(id);
  }
  const courseBooks = [...sortedBooks, ...booksMap.values()].flatMap((book) => {
    const courseBook = bookToCourseBook(user, book, ip);
    return courseBook ? [courseBook] : [];
  });
  const bookActivities = courseBooks.flatMap((book) =>
    book.sections.flatMap(({ topics }) =>
      topics.flatMap((topic) =>
        activities.flatMap((activity) => {
          if (activity.topic.id !== topic.id) return [];

          return [
            {
              ...activity,
              book: { id: book.id, name: book.name },
              status: isCompleted(topic, activity)
                ? ("completed" as const)
                : ("incompleted" as const),
            },
          ];
        })
      )
    )
  );

  return { courseBooks, bookActivities };
}
