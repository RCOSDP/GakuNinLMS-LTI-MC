import { FastifySchema } from "fastify";
import { outdent } from "outdent";
import {
  TopicProps,
  topicPropsSchema,
  topicSchema,
} from "$server/models/topic";
import { SessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import createTopic from "$server/utils/topic/createTopic";

export const createSchema: FastifySchema = {
  summary: "トピックの作成",
  description: outdent`
    トピックを作成します。
    教員または管理者でなければなりません。`,
  body: topicPropsSchema,
  response: {
    201: topicSchema,
    400: {},
  },
};

export const createHooks = {
  auth: [authUser, authInstructor],
};

export async function create({
  session,
  body,
}: {
  session: SessionSchema;
  body: TopicProps;
}) {
  const created = await createTopic(session.user.id, body);

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
