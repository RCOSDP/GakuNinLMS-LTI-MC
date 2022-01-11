import type { FromSchema } from "json-schema-to-ts";

/** コンテンツ作成者の更新のためのリクエストパラメーター */
export const AuthorsProps = {
  type: "object",
  required: ["authors"],
  properties: {
    authors: {
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
    },
  },
  additionalProperties: false,
} as const;

/** コンテンツ作成者の更新のためのリクエストパラメーター */
export type AuthorsProps = FromSchema<typeof AuthorsProps>;
