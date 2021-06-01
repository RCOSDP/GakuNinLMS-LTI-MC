import { FastifyRequest } from "fastify";
import authUser from "$server/auth/authUser";
import type Method from "$server/types/method";
import { upsertLtiMember } from "$server/utils/ltiMember";

export const method: Method = {
  put: {
    summary: "受講者の更新",
    description: "受講者を更新します。",
    response: {
      204: { type: "null", description: "成功" },
      400: {},
    },
  },
};

export const hooks = {
  put: { auth: [authUser] },
};

export async function update({ session }: FastifyRequest) {
  if (session.ltiResourceLink == null) return { status: 400 };

  await upsertLtiMember(
    session.ltiResourceLink.consumerId,
    session.ltiResourceLink.contextId,
    session.user.ltiUserId
  );

  return { status: 204 };
}
