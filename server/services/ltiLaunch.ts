import { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import authLtiLaunch from "$server/auth/authLtiLaunch";
import { FRONTEND_ORIGIN, FRONTEND_PATH } from "$server/utils/env";
import {
  LtiLaunchBody,
  ltiLaunchBodySchema,
} from "$server/validators/ltiLaunchBody";
import init from "./init";

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

export async function post(req: FastifyRequest<{ Body: Props }>) {
  await init(req);

  return {
    status: 302,
    headers: { location: frontendUrl },
  };
}
