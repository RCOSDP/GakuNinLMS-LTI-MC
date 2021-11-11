import type { FromSchema } from "json-schema-to-ts";

/** キーワード */
export const KeywordSchema = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: { type: "number" },
    name: { type: "string" },
  },
} as const;

/** キーワード */
export type KeywordSchema = FromSchema<typeof KeywordSchema>;
