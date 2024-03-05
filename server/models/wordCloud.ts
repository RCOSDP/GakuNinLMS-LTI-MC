import type { FromSchema } from "json-schema-to-ts";

export const WordCloudSchema = {
  title: "ワードクラウド",
  type: "array",
  items: {
    type: "object",
    properties: {
      text: { title: "Consumer ID", type: "string" },
      count: { title: "Context ID", type: "number" },
    },
    required: ["text", "count"],
    additionalProperties: false,
  },
} as const;

/** ワードクラウド */
export type WordCloudSchema = FromSchema<typeof WordCloudSchema>;
