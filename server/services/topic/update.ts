import { FastifySchema } from "fastify";
import {
  TopicProps,
  topicPropsSchema,
  topicSchema,
} from "$server/models/topic";
import { TopicParams, topicParamsSchema } from "$server/validators/topicParams";
import upsertTopic from "$server/utils/topic/upsertTopic";
import { Session } from "$utils/session";

export const updateSchema: FastifySchema = {
  description: "トピックの更新",
  params: topicParamsSchema,
  body: topicPropsSchema,
  response: {
    201: topicSchema,
    400: {},
  },
};

export async function update({
  session,
  body,
  params,
}: {
  session: Session;
  body: TopicProps;
  params: TopicParams;
}) {
  if (!session.user) return { status: 400 };

  const created = await upsertTopic(session.user.id, {
    ...body,
    id: params.topic_id,
  });

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
