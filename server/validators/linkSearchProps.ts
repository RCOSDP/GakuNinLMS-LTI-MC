import type { FromSchema } from "json-schema-to-ts";

export const LinkSearchProps = {
  type: "object",
  required: ["q"],
  properties: {
    q: { type: "string" },
    sort: {
      type: "string",
      enum: ["created", "reverse-created"],
    },
    page: { type: "number" },
    per_page: { type: "number" },
  },
  additionalProperties: false,
} as const;

export type LinkSearchProps = FromSchema<typeof LinkSearchProps>;
