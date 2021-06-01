import { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import authLtiLaunch from "$server/auth/authLtiLaunch";
import { upsertUser } from "$server/utils/user";
import { FRONTEND_ORIGIN, FRONTEND_PATH } from "$server/utils/env";
import { ltiLaunchBodySchema } from "$server/validators/ltiLaunchBody";
import { isInstructor } from "$server/utils/ltiv1p1/roles";
import {
  findLtiResourceLink,
  upsertLtiResourceLink,
} from "$server/utils/ltiResourceLink";
import { upsertLtiMember } from "$server/utils/ltiMember";

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

export async function post({ session }: FastifyRequest) {
  const { ltiLaunchBody } = session;
  const ltiResourceLink = await findLtiResourceLink({
    consumerId: ltiLaunchBody.oauth_consumer_key,
    id: ltiLaunchBody.resource_link_id,
  });

  if (ltiResourceLink) {
    await upsertLtiResourceLink({
      ...ltiResourceLink,
      title: ltiLaunchBody.resource_link_title ?? ltiResourceLink.title,
      contextTitle: ltiLaunchBody.context_title ?? ltiResourceLink.contextTitle,
      contextLabel: ltiLaunchBody.context_label ?? ltiResourceLink.contextLabel,
    });
  }

  const user = await upsertUser({
    ltiConsumerId: ltiLaunchBody.oauth_consumer_key,
    ltiUserId: ltiLaunchBody.user_id,
    name: ltiLaunchBody.lis_person_name_full ?? "",
  });

  if (ltiResourceLink && !isInstructor(ltiLaunchBody)) {
    await upsertLtiMember(
      ltiResourceLink.consumerId,
      ltiResourceLink.contextId,
      user.ltiUserId
    );
  }

  Object.assign(session, { ltiResourceLink, user });

  return {
    status: 302,
    headers: {
      location: frontendUrl,
    },
  };
}
