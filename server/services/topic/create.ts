import { FastifySchema } from "fastify";
import {
  TopicProps,
  topicPropsSchema,
  topicSchema,
} from "$server/models/topic";
import createTopic from "$server/utils/topic/createTopic";
import { Session } from "$utils/session";

export const createSchema: FastifySchema = {
  description: "トピックの作成",
  body: topicPropsSchema,
  response: {
    201: topicSchema,
    400: {},
  },
};

export async function create({
  session,
  body,
}: {
  session: Session;
  body: TopicProps;
}) {
  if (!session.user) return { status: 400 };

  const created = await createTopic(session.user.id, body);

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
