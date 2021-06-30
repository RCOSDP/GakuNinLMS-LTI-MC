import { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import authLtiLaunch from "$server/auth/authLtiLaunch";
import { upsertUser } from "$server/utils/user";
import { FRONTEND_ORIGIN, FRONTEND_PATH } from "$server/utils/env";
import {
  LtiLaunchBody,
  ltiLaunchBodySchema,
} from "$server/validators/ltiLaunchBody";
import {
  findLtiResourceLink,
  upsertLtiResourceLink,
} from "$server/utils/ltiResourceLink";

export type Props = LtiLaunchBody;

const frontendUrl = `${FRONTEND_ORIGIN}${FRONTEND_PATH}`;

export const method = {
  post: {
    summary: "LTI起動エンドポイント",
    description: outdent`
      LTIツールとして起動するためのエンドポイントです。
      このエンドポイントをLMSのLTIツールのURLに指定して利用します。
      成功時 ${frontendUrl} にリダイレクトします。`,
    consumes: ["application/x-www-form-urlencoded"],
    body: ltiLaunchBodySchema,
    response: {
      302: {},
    },
  },
};

export const hooks = {
  post: { auth: [authLtiLaunch] },
};

export async function post({ body, session }: FastifyRequest<{ Body: Props }>) {
  const ltiResourceLink = await findLtiResourceLink({
    consumerId: body.oauth_consumer_key,
    id: body.resource_link_id,
  });

  if (ltiResourceLink) {
    await upsertLtiResourceLink({
      ...ltiResourceLink,
      title: body.resource_link_title ?? ltiResourceLink.title,
      contextTitle: body.context_title ?? ltiResourceLink.contextTitle,
      contextLabel: body.context_label ?? ltiResourceLink.contextLabel,
    });
  }

  const user = await upsertUser({
    ltiConsumerId: body.oauth_consumer_key,
    ltiUserId: body.user_id,
    name: body.lis_person_name_full ?? "",
  });

  Object.assign(session, { ltiResourceLink, user });

  return {
    status: 302,
    headers: { location: frontendUrl },
  };
}
