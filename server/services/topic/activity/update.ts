import type { FastifySchema } from "fastify";
import type { ActivityProps } from "$server/models/activity";
import { activityPropsSchema } from "$server/models/activity";
import type { TopicParams } from "$server/validators/topicParams";
import { topicParamsSchema } from "$server/validators/topicParams";
import type { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import topicExists from "$server/utils/topic/topicExists";
import upsertTopicActivity from "$server/utils/activity/upsertTopicActivity";
import upsertLtiContextActivity from "$server/utils/activity/upsertLtiContextActivity";

export const updateSchema: FastifySchema = {
  summary: "学習活動の更新",
  description: "自身の学習活動を更新します。",
  params: topicParamsSchema,
  body: activityPropsSchema,
  response: {
    201: activityPropsSchema,
    400: {},
    404: {},
  },
};

export const updateHooks = {
  auth: [authUser],
};

export async function update({
  session,
  body,
  params,
}: {
  session: SessionSchema;
  body: ActivityProps;
  params: TopicParams;
}) {
  const found = await topicExists(params.topic_id);

  if (!found) return { status: 404 };

  await upsertLtiContextActivity({
    learnerId: session.user.id,
    topicId: params.topic_id,
    ltiConsumerId: session.oauthClient.id,
    ltiContextId: session.ltiContext.id,
    activity: body,
  });

  const created = await upsertTopicActivity({
    learnerId: session.user.id,
    topicId: params.topic_id,
    activity: body,
  });

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
