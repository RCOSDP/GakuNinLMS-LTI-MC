import type { SessionSchema } from "$server/models/session";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { LearnerSchema } from "$server/models/learner";
import type { CourseBookSchema } from "$server/models/courseBook";
import type { BookActivitySchema } from "$server/models/bookActivity";
import prisma from "$server/utils/prisma";
import { bookIncludingTopicsArg } from "$server/utils/book/bookToBookSchema";
import { toSchema } from "./bookWithActivity";
import { isInstructor } from "$server/utils/session";

/** 受講者の取得 */
async function findLtiMembers(
  session: SessionSchema,
  {
    consumerId,
    contextId,
  }: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">,
  currentLtiContextOnly: boolean
) {
  const activityScope = currentLtiContextOnly
    ? { ltiConsumerId: consumerId, ltiContextId: contextId }
    : { ltiConsumerId: "", ltiContextId: "" };

  // NOTE: 表示可能な範囲
  // 教員・TAの場合…すべて表示
  // それ以外… 共有されている範囲または著者に含まれる範
  const displayable = isInstructor(session) ? undefined : [
      { shared: true },
      { authors: { some: { userId: session.user.id } } },
  ];

  const learners = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      activities: {
        where: {
          ...activityScope,
          topic: {
            topicSection: {
              some: {
                section: {
                  book: {
                    ltiResourceLinks: { some: { consumerId, contextId } },
                    OR: displayable
                  },
                },
              },
            },
          },
        },
        include: {
          learner: { select: { id: true, name: true, email: true } },
          topic: {
            select: { id: true, name: true, timeRequired: true },
          },
        },
      },
    },
    where: {
      ltiMembers: { some: { consumerId, contextId } },
    },
  });

  return learners;
}

/**
 * LTI Context に紐づくブックに含まれる表示可能なトピックの学習活動の取得
 * @param session セッション
 * @param currentLtiContextOnly 現在の LTI Context ごとでの学習状況を取得するか否か (true: LTI Context ごと, それ以外: すべて)
 */
async function findAllActivity(
  session: SessionSchema,
  currentLtiContextOnly: boolean
): Promise<{
  learners: Array<LearnerSchema>;
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}> {
//  const user = session.user;
  const consumerId = session.oauthClient.id;
  const contextId = session.ltiContext.id;
  const ltiMembers = await findLtiMembers(
    session,
    { consumerId, contextId },
    currentLtiContextOnly
  );
  const ltiResourceLinks = await prisma.ltiResourceLink.findMany({
    where: { consumerId, contextId },
    orderBy: { title: "asc" },
    select: { book: bookIncludingTopicsArg },
  });
  const books = ltiResourceLinks.map(({ book }) => book);
  const activities = ltiMembers.flatMap(({ activities }) => activities);
  const { courseBooks, bookActivities } = toSchema({
    session,
    books,
    activities,
  });

  return { learners: ltiMembers, courseBooks, bookActivities };
}

export default findAllActivity;
