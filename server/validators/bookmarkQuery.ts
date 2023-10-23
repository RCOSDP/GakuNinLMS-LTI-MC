import type { FromSchema } from "json-schema-to-ts";

export const BookmarkQuery = {
  type: "object",
  properties: {
    topicId: { type: "number" },
  },
  additionalProperties: false,
  required: ["topicId"],
} as const;

export type BookmarkQuery = FromSchema<typeof BookmarkQuery>;
