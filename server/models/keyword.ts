import type { FromSchema } from "json-schema-to-ts";

/** キーワード */
export const KeywordPropSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
  },
  additionalProperties: false,
} as const;

/** キーワード */
export type KeywordPropSchema = FromSchema<typeof KeywordPropSchema>;

/** キーワード */
export const KeywordSchema = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: { type: "number" },
    name: { type: "string" },
  },
  additionalProperties: false,
} as const;

/** キーワード */
export type KeywordSchema = FromSchema<typeof KeywordSchema>;
