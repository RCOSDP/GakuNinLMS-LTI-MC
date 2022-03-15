import type { FastifyRequest, FastifySchema } from "fastify";
import { outdent } from "outdent";
import type { TopicPropsWithUpload } from "$server/models/topic";
import { topicPropsWithUploadSchema, topicSchema } from "$server/models/topic";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import createTopic from "$server/utils/topic/createTopic";
import isValidVideoResource from "$server/utils/isValidVideoResource";
import { WOWZA_BASE_URL } from "$server/utils/env";
import wowzaUpload from "$server/utils/topic/wowzaUpload";

export const createSchema: FastifySchema = {
  summary: "トピックの作成",
  description: outdent`
    トピックを作成します。
    教員または管理者でなければなりません。`,
  body: topicPropsWithUploadSchema,
  response: {
    201: topicSchema,
    400: {},
  },
};

export const createHooks = {
  auth: [authUser, authInstructor],
};

export async function create({
  protocol,
  hostname,
  session,
  body,
}: FastifyRequest<{
  Body: TopicPropsWithUpload;
}>) {
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

  const created = await createTopic(session.user.id, body.topic);

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
