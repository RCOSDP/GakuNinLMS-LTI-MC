import type { SessionSchema } from "$server/models/session";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { UserSchema } from "$server/models/user";
import { LearnerSchema } from "$server/models/learner";
import { CourseBookSchema } from "$server/models/courseBook";
import { BookActivitySchema } from "$server/models/bookActivity";
import prisma from "$server/utils/prisma";
import { bookIncludingTopicArg, toSchema } from "./bookWithActivity";

/** 受講者の取得 */
async function findLtiMembers(
  instructor: Pick<UserSchema, "id">,
  {
    consumerId,
    contextId,
  }: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
) {
  const learners = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      activities: {
        include: {
          learner: { select: { id: true, name: true } },
          topic: {
            select: { id: true, name: true, timeRequired: true },
          },
        },
      },
    },
    where: {
      AND: [
        { ltiMembers: { some: { consumerId, contextId } } },
        {
          activities: {
            some: {
              topic: {
                topicSection: {
                  some: {
                    section: {
                      book: {
                        AND: [
                          {
                            ltiResourceLinks: {
                              some: {
                                consumerId,
                                contextId,
                              },
                            },
                          },
                          {
                            // NOTE: 表示可能な範囲 … 共有されているか作成者が一致
                            OR: [{ shared: true }, { authorId: instructor.id }],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  });

  return learners;
}

/** LTI Context に紐づくブックに含まれる表示可能なトピックの学習活動の取得 */
async function findAllActivity(session: SessionSchema): Promise<{
  learners: Array<LearnerSchema>;
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}> {
  const user = session.user;
  const consumerId = session.oauthClient.id;
  const contextId = session.ltiContext.id;
  const ltiMembers = await findLtiMembers(user, { consumerId, contextId });
  const ltiResourceLinks = await prisma.ltiResourceLink.findMany({
    where: { consumerId, contextId },
    orderBy: { title: "asc" },
    select: { bookId: true },
  });
  const books = await prisma.book.findMany({
    ...bookIncludingTopicArg,
    where: {
      ltiResourceLinks: { some: { consumerId, contextId } },
    },
  });
  const activities = ltiMembers.flatMap(({ activities }) => activities);
  const { courseBooks, bookActivities } = toSchema({
    user,
    ltiResourceLinks,
    activities,
    books,
  });

  return { learners: ltiMembers, courseBooks, bookActivities };
}

export default findAllActivity;
