import type { FastifyRequest } from "fastify";
import { FRONTEND_ORIGIN, FRONTEND_PATH } from "$server/utils/env";
import { upsertUser } from "$server/utils/user";
import {
  findLtiResourceLink,
  upsertLtiResourceLink,
} from "$server/utils/ltiResourceLink";
import { getSystemSettings } from "$server/utils/systemSettings";

const frontendUrl = `${FRONTEND_ORIGIN}${FRONTEND_PATH}`;

/** 起動時の初期化プロセス */
async function init({ session }: FastifyRequest) {
  const systemSettings = getSystemSettings();

  const ltiResourceLink = session.ltiResourceLinkRequest?.id
    ? await findLtiResourceLink({
        consumerId: session.oauthClient.id,
        id: session.ltiResourceLinkRequest.id,
      })
    : null;


  if (ltiResourceLink) {
    await upsertLtiResourceLink({
      ...ltiResourceLink,
      title: session?.ltiResourceLinkRequest?.title ?? ltiResourceLink.title,
      contextTitle: session.ltiContext.title ?? ltiResourceLink.contextTitle,
      contextLabel: session.ltiContext.label ?? ltiResourceLink.contextLabel,
    });
  }

  const user = await upsertUser({
    ltiConsumerId: session.oauthClient.id,
    ltiUserId: session.ltiUser.id,
    name: session.ltiUser.name ?? "",
    email: session.ltiUser.email ?? "",
  });

  Object.assign(session, { ltiResourceLink, user, systemSettings });

  return {
    status: 302,
    headers: { location: frontendUrl },
  } as const;
}

/** OpenAPI Responses Object */
init.response = { 302: {} } as const;

/** 成功時のリダイレクト先のフロントエンドのURL */
init.frontendUrl = frontendUrl;

export default init;
