import type { FromSchema } from "json-schema-to-ts";

/** ユーザー情報取得のためのリクエストパラメーター */
export const UsersParams = {
  type: "object",
  required: ["email"],
  properties: {
    // NOTE: ReDoS攻撃に脆弱になりうるのでここでは `format: "email"` を使わない
    email: { type: "string", minLength: 1 },
  },
  additionalProperties: false,
} as const;

/** ユーザー情報取得のためのリクエストパラメーター */
export type UsersParams = FromSchema<typeof UsersParams>;
