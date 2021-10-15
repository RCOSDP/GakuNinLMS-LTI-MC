import type { FromSchema } from "json-schema-to-ts";

/** コンテンツ著者の更新のためのリクエストパラメーター */
export const AuthorsProps = {
  type: "array",
  items: {
    type: "object",
    required: ["id", "roleName"],
    properties: {
      id: { type: "integer" },
      roleName: { type: "string" },
    },
    additionalProperties: false,
  },
} as const;

/** コンテンツ著者の更新のためのリクエストパラメーター */
export type AuthorsProps = FromSchema<typeof AuthorsProps>;
