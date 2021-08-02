import { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import { LtiVersionSchema } from "$server/models/ltiVersion";
import { OauthClientSchema } from "$server/models/oauthClient";
import createAccount from "$server/utils/ltiv1p3/createAccount";

export type Props = {
  client_id: string;
  iss: string;
  login_hint: string;
  target_link_uri: string;
  lti_message_hint?: string;
  lti_deployment_id?: string;
};

const baseSchema = {
  summary: "LTI v1.3 ログイン初期化エンドポイント",
  description: outdent`
    LTIツールとして起動するためのエンドポイントです。
    このエンドポイントをLMSのLTIツールのログイン初期化エンドポイントに指定して利用します。
    Authorizationエンドポイントにリダイレクトします。`,
  consumes: [],
  response: {
    302: {},
  },
};

export const method = {
  get: baseSchema,
  post: { ...baseSchema, consumes: ["application/x-www-form-urlencoded"] },
};

async function baseAction(req: FastifyRequest, props: Props) {
  const callbackUrl = `${req.protocol}://${req.hostname}/api/v2/lti/callback`;
  const { state, nonce, authorizationUrl } = await createAccount(
    props,
    callbackUrl
  );
  const oauthClient: OauthClientSchema = { id: props.client_id, nonce };
  const ltiVersion: LtiVersionSchema = "1.3.0";

  Object.assign(req.session, { state, oauthClient, ltiVersion });

  return {
    status: 302,
    headers: { location: authorizationUrl },
  };
}

export async function get(req: FastifyRequest<{ Params: Props }>) {
  return await baseAction(req, req.params);
}

export async function post(req: FastifyRequest<{ Body: Props }>) {
  return await baseAction(req, req.body);
}
