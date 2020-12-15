import { FastifySchema } from "fastify";
import { TopicParams, topicParamsSchema } from "$server/validators/topicParams";
import destroyTopic from "$server/utils/topic/destroyTopic";

export const destroySchema: FastifySchema = {
  description: "トピックの削除",
  params: topicParamsSchema,
  response: {
    204: {},
  },
};

export async function destroy({ params }: { params: TopicParams }) {
  await destroyTopic(params.topic_id);

  return {
    status: 204,
  };
}
