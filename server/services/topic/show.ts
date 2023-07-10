import type { FastifySchema, FastifyRequest } from "fastify";
import { outdent } from "outdent";
import { topicSchema } from "$server/models/topic";
import type { TopicParams } from "$server/validators/topicParams";
import { topicParamsSchema } from "$server/validators/topicParams";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import findTopic from "$server/utils/topic/findTopic";

export const showSchema: FastifySchema = {
  summary: "トピックの取得",
  description: outdent`
    トピックの詳細を取得します。
    教員または管理者でなければなりません。`,
  params: topicParamsSchema,
  response: {
    200: topicSchema,
    404: {},
  },
};

export const showHooks = {
  auth: [authUser, authInstructor],
};

export async function show({
  params,
}: FastifyRequest<{ Params: TopicParams }>) {
  const { topic_id: topicId } = params;
  const topic = await findTopic(topicId);

  return {
    status: topic == null ? 404 : 200,
    body: topic,
  };
}
