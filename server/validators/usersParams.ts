import { FromSchema } from "json-schema-to-ts";

/** ユーザー情報取得のためのリクエストパラメーター */
export const UsersParams = {
  type: "object",
  required: ["email"],
  properties: {
    email: { type: "string" },
  },
  additionalProperties: false,
} as const;

/** ユーザー情報取得のためのリクエストパラメーター */
export type UsersParams = FromSchema<typeof UsersParams>;
