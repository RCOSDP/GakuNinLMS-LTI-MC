import type { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { isInstructor } from "$server/utils/session";
import { ActivityTimeRangeCountProps } from "$server/validators/activityTimeRangeCount";
import { ActivityTimeRangeCountByTopicParams } from "$server/validators/activityTimeRangeCountByTopicParams";
import findActivityTimeRangeCountByTopic from "$server/utils/activity/findActivityTimeRangeCountByTopic";

export type Params = ActivityTimeRangeCountByTopicParams;

export const method = {
  get: {
    summary: "トピックごとの受講者の視聴行動回数の取得",
    description: outdent`
      トピックごとの受講者の視聴行動回数を取得します。
      教員または管理者でなければなりません。`,
    params: ActivityTimeRangeCountByTopicParams,
    response: {
      200: {
        type: "array",
        items: ActivityTimeRangeCountProps,
      },
    },
  },
} as const;

export const hooks = {
  get: { auth: [authUser, authInstructor] },
};

export async function show({
  session,
  params,
}: FastifyRequest<{ Params: ActivityTimeRangeCountByTopicParams }>) {
  const { topicId } = params;

  if (!isInstructor(session)) {
    return { status: 403 };
  }

  const activityTimeRangeCounts =
    await findActivityTimeRangeCountByTopic(topicId);

  return {
    status: activityTimeRangeCounts == null ? 404 : 200,
    body: activityTimeRangeCounts,
  };
}
