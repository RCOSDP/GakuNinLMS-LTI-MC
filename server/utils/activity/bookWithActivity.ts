import { Prisma } from "@prisma/client";
import sortedIndexOf from "lodash.sortedindexof";
import { UserSchema } from "$server/models/user";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { BookActivitySchema } from "$server/models/bookActivity";
import { CourseBookSchema } from "$server/models/courseBook";
import getDisplayableBook from "$server/utils/getDisplayableBook";
import bookCreateBy from "$server/utils/bookCreateBy";
import topicCreateBy from "$server/utils/topicCreateBy";
import isCompleted from "./isCompleted";

export const bookIncludingActivityArg = {
  // NOTE: toSchema() での並び替えの最適化を図る目的
  orderBy: { id: "asc" },
  include: {
    author: true,
    ltiResourceLinks: true,
    sections: {
      orderBy: { order: "asc" },
      select: {
        topicSections: {
          orderBy: { order: "asc" },
          select: {
            topic: {
              select: {
                id: true,
                name: true,
                timeRequired: true,
                creator: true,
                shared: true,
                activities: {
                  select: {
                    learner: { select: { id: true, name: true } },
                    topic: { select: { id: true, name: true } },
                    totalTimeMs: true,
                    createdAt: true,
                    updatedAt: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

type BookWithActivity = Prisma.BookGetPayload<typeof bookIncludingActivityArg>;

function bookToCourseBook(
  user: Pick<UserSchema, "id">,
  book: BookWithActivity
) {
  const courseBook = getDisplayableBook(
    {
      ...book,
      sections: book.sections.map((section) => ({
        topics: section.topicSections.map(({ topic }) => topic),
      })),
    },
    (book) => bookCreateBy(book, user),
    (topic) => topicCreateBy(topic, user)
  );

  return courseBook;
}

/** BookActivitySchema への変換 - 引数の books は book.id 昇順でなければならない */
export function toSchema({
  user,
  ltiResourceLinks,
  books,
}: {
  user: Pick<UserSchema, "id">;
  ltiResourceLinks: Array<Pick<LtiResourceLinkSchema, "bookId">>;
  books: Array<BookWithActivity>;
}): {
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
} {
  const sortedBooks: Array<BookWithActivity> = [];
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
    const courseBook = bookToCourseBook(user, book);
    return courseBook ? [courseBook] : [];
  });
  const bookActivities = courseBooks.flatMap((book) =>
    book.sections.flatMap(({ topics }) =>
      topics.flatMap((topic) =>
        topic.activities.map((activity) => ({
          ...activity,
          book: { id: book.id, name: book.name },
          status: isCompleted(topic, activity)
            ? ("completed" as const)
            : ("incompleted" as const),
        }))
      )
    )
  );

  return { courseBooks, bookActivities };
}
