import type { SessionSchema } from "$server/models/session";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { UserSchema } from "$server/models/user";
import type { LearnerSchema } from "$server/models/learner";
import type { CourseBookSchema } from "$server/models/courseBook";
import type { BookActivitySchema } from "$server/models/bookActivity";
import prisma from "$server/utils/prisma";
import { bookIncludingTopicsArg } from "$server/utils/book/bookToBookSchema";
import { toSchema } from "./bookWithActivity";
import { isAdministrator } from "$utils/session";

/** 受講者の取得 */
async function findLtiMembers(
  instructor: Pick<UserSchema, "id">,
  {
    consumerId,
    contextId,
  }: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">,
  currentLtiContextOnly?: boolean
) {
  const topicActivityScope = {
    topic: {
      topicSection: {
        some: {
          section: {
            book: {
              ltiResourceLinks: { some: { consumerId, contextId } },
              // NOTE: 表示可能な範囲 … 共有されている範囲または著者に含まれる範囲
              OR: [
                { shared: true },
                { authors: { some: { userId: instructor.id } } },
              ],
            },
          },
        },
      },
    },
  };

  const activityScope =
    currentLtiContextOnly === undefined
      ? {
          ltiConsumerId: consumerId,
          ltiContextId: contextId,
        }
      : currentLtiContextOnly
      ? {
          ltiConsumerId: consumerId,
          ltiContextId: contextId,
          ...topicActivityScope,
        }
      : { ltiConsumerId: "", ltiContextId: "", ...topicActivityScope };

  const ltiMembersTarget =
    currentLtiContextOnly === undefined && consumerId == "" && contextId == ""
      ? {}
      : { ltiMembers: { some: { consumerId, contextId } } };

  const learners = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      activities: {
        where: {
          ...activityScope,
        },
        include: {
          ltiContext: { select: { id: true, title: true, label: true } },
          learner: {
            select: {
              id: true,
              name: true,
              email: true,
              ltiUserId: true,
              ltiConsumerId: true,
            },
          },
          topic: {
            select: { id: true, name: true, timeRequired: true },
          },
        },
      },
    },
    where: {
      ...ltiMembersTarget,
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
  currentLtiContextOnly?: boolean | undefined,
  ltiConsumerId?: string | undefined,
  ltiContextId?: string | undefined
): Promise<{
  learners: Array<LearnerSchema>;
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}> {
  const isDownloadPage =
    isAdministrator(session) && currentLtiContextOnly === undefined;
  const user = session.user;
  const consumerId = isDownloadPage
    ? ltiConsumerId !== undefined
      ? ltiConsumerId
      : ""
    : session.oauthClient.id;
  const contextId = isDownloadPage
    ? ltiContextId !== undefined
      ? ltiContextId
      : ""
    : session.ltiContext.id;
  const ltiMembers = await findLtiMembers(
    user,
    { consumerId, contextId },
    currentLtiContextOnly
  );

  const bookTarget =
    consumerId && contextId
      ? {
          OR: [
            { shared: true },
            {
              authors: {
                some: { user: { ltiConsumerId: { equals: ltiConsumerId } } },
              },
            },
          ],
        }
	: { };

  let books;
  if (isDownloadPage) {
    // ダウンロードページであればltiResourceLinkに依存せずに取得
    books = await prisma.book.findMany({
      include: {
        authors: {
          include: {
            user: {
              include: { activities: true },
            },
            role: true,
          },
        },
        ltiResourceLinks: { include: { context: true } },
        keywords: true,
        sections: {
          include: {
            topicSections: {
              include: {
                topic: {
                  include: {
                    activities: {
                      where: {
                        ltiConsumerId: { equals: consumerId },
                        ltiContextId: { equals: contextId },
                      },
                    },
                    authors: { include: { user: true, role: true } },
                    resource: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        ...bookTarget,
      },
    });
  } else {
    const ltiResourceLinks = await prisma.ltiResourceLink.findMany({
      where: { consumerId, contextId },
      orderBy: { title: "asc" },
      select: { book: bookIncludingTopicsArg },
    });
    books = ltiResourceLinks.map(({ book }) => book);
  }

  const activities = ltiMembers.flatMap(({ activities }) => activities);

  const { courseBooks, bookActivities } = toSchema({
    user,
    books,
    activities,
    isDownloadPage,
  });

  return { learners: ltiMembers, courseBooks, bookActivities };
}

export default findAllActivity;
