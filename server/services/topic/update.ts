import type { FastifyRequest, FastifySchema } from "fastify";
import { outdent } from "outdent";
import type { TopicPropsWithUpload } from "$server/models/topic";
import { topicPropsWithUploadSchema, topicSchema } from "$server/models/topic";
import type { TopicParams } from "$server/validators/topicParams";
import { topicParamsSchema } from "$server/validators/topicParams";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { isUsersOrAdmin } from "$server/utils/session";
import topicExists from "$server/utils/topic/topicExists";
import upsertTopic from "$server/utils/topic/upsertTopic";
import isValidVideoResource from "$server/utils/isValidVideoResource";
import { WOWZA_BASE_URL } from "$server/utils/env";
import updateBookTimeRequired from "$server/utils/topic/updateBookTimeRequired";
import wowzaUpload from "$server/utils/topic/wowzaUpload";

export const updateSchema: FastifySchema = {
  summary: "トピックの更新",
  description: outdent`
    トピックを更新します。
    教員または管理者でなければなりません。
    教員は自身の著作のトピックでなければなりません。`,
  params: topicParamsSchema,
  body: topicPropsWithUploadSchema,
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
  ip,
}: FastifyRequest<{
  Body: TopicPropsWithUpload;
  Params: TopicParams;
}>) {
  const found = await topicExists(params.topic_id);

  if (!found) return { status: 404 };
  if (!isUsersOrAdmin(session, found.authors)) return { status: 403 };

  if (
    body.provider == "https://www.wowza.com/" &&
    body.fileName &&
    body.fileContent
  )
    body.topic.resource.url = await wowzaUpload(
      session.user.ltiConsumerId,
      session.user.id,
      body.fileName,
      body.fileContent,
      body.wowzaBaseUrl
    );

  const additionalProviderUrl = WOWZA_BASE_URL && `${protocol}://${hostname}/`;
  if (!isValidVideoResource(body.topic.resource, additionalProviderUrl)) {
    return { status: 400 };
  }

  const created = await upsertTopic(
    session.user.id,
    {
      ...body.topic,
      id: params.topic_id,
    },
    ip
  );

  if (created == null) return { status: 400 };

  await updateBookTimeRequired(created.id);

  return {
    status: 201,
    body: created,
  };
}
