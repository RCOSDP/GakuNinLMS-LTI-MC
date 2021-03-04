import { FastifyRequest, FastifySchema } from "fastify";
import { outdent } from "outdent";
import {
  TopicProps,
  topicPropsSchema,
  topicSchema,
} from "$server/models/topic";
import { TopicParams, topicParamsSchema } from "$server/validators/topicParams";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { isUserOrAdmin } from "$server/utils/session";
import topicExists from "$server/utils/topic/topicExists";
import upsertTopic from "$server/utils/topic/upsertTopic";
import isValidVideoResource from "$server/utils/isValidVideoResource";
import { WOWZA_BASE_URL } from "$server/utils/env";

export const updateSchema: FastifySchema = {
  summary: "トピックの更新",
  description: outdent`
    トピックを更新します。
    教員または管理者でなければなりません。
    教員は自身の作成したトピックでなければなりません。`,
  params: topicParamsSchema,
  body: topicPropsSchema,
  response: {
    201: topicSchema,
    400: {},
    403: {},
    404: {},
  },
};

export const updateHooks = {
  auth: [authUser, authInstructor],
};

export async function update({
  protocol,
  hostname,
  session,
  body,
  params,
}: FastifyRequest<{
  Body: TopicProps;
  Params: TopicParams;
}>) {
  const found = await topicExists(params.topic_id);

  if (!found) return { status: 404 };
  if (!isUserOrAdmin(session, { id: found.creatorId })) return { status: 403 };

  const additionalProviderUrl = WOWZA_BASE_URL && `${protocol}://${hostname}/`;
  if (!isValidVideoResource(body.resource, additionalProviderUrl)) {
    return { status: 400 };
  }

  const created = await upsertTopic(session.user.id, {
    ...body,
    id: params.topic_id,
  });

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
