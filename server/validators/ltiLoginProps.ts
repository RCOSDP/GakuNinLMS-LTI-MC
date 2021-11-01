import type { FromSchema } from "json-schema-to-ts";

export const LtiLoginProps = {
  title: "LTI v1.3 ログイン初期化エンドポイントのリクエストパラメーター",
  type: "object",
  required: [
    "iss",
    "login_hint",
    "target_link_uri",
    // TODO: client_id に依存している実装箇所が存在するため必須にしているが本来任意なので修正したい
    "client_id",
  ],
  properties: {
    iss: { type: "string" },
    login_hint: { type: "string" },
    target_link_uri: { type: "string" },
    lti_message_hint: { type: "string" },
    lti_deployment_id: { type: "string" },
    client_id: { type: "string" },
  },
} as const;

/** LTI v1.3 ログイン初期化エンドポイントのリクエストパラメーター */
export type LtiLoginProps = FromSchema<typeof LtiLoginProps>;
