import { FastifyRequest, FastifySchema } from "fastify";
import { outdent } from "outdent";
import {
  LtiResourceLinkProps,
  ltiResourceLinkPropsSchema,
  ltiResourceLinkSchema,
} from "$server/models/ltiResourceLink";
import {
  LtiResourceLinkParams,
  ltiResourceLinkParamsSchema,
} from "$server/validators/ltiResourceLinkParams";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { upsertLtiResourceLink } from "$server/utils/ltiResourceLink";

export const updateSchema: FastifySchema = {
  summary: "LTI Resource Linkの更新",
  description: outdent`
    LTI Resource Linkを更新します。
    教員または管理者でなければなりません。`,
  params: ltiResourceLinkParamsSchema,
  body: ltiResourceLinkPropsSchema,
  response: {
    201: ltiResourceLinkSchema,
    400: {},
  },
};

export const updateHooks = {
  auth: [authUser, authInstructor],
};

// TODO: 複数著者に対応してほしい
export async function update({
  body,
  params,
  session,
}: FastifyRequest<{
  Body: LtiResourceLinkProps;
  Params: LtiResourceLinkParams;
}>) {
  const link = await upsertLtiResourceLink({
    ...body,
    consumerId: params.lti_consumer_id,
    id: params.lti_resource_link_id,
    creatorId: session.user.id,
  });

  session.ltiResourceLink = link;

  return {
    status: link == null ? 400 : 201,
    body: link,
  };
}
