import { FastifyRequest } from "fastify";
import { upsertUser } from "$server/utils/user";
import {
  findLtiResourceLink,
  upsertLtiResourceLink,
} from "$server/utils/ltiResourceLink";

/** 起動時の初期化プロセス */
async function init({ session }: FastifyRequest) {
  const ltiResourceLink = await findLtiResourceLink({
    consumerId: session.oauthClient.id,
    id: session.ltiResourceLinkRequest.id,
  });

  if (ltiResourceLink) {
    await upsertLtiResourceLink({
      ...ltiResourceLink,
      title: session.ltiResourceLinkRequest.title ?? ltiResourceLink.title,
      contextTitle: session.ltiContext.title ?? ltiResourceLink.contextTitle,
      contextLabel: session.ltiContext.label ?? ltiResourceLink.contextLabel,
    });
  }

  const user = await upsertUser({
    ltiConsumerId: session.oauthClient.id,
    ltiUserId: session.ltiUser.id,
    name: session.ltiUser.name ?? "",
  });

  Object.assign(session, { ltiResourceLink, user });
}

export default init;
