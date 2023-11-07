import type { FromSchema } from "json-schema-to-ts";

/** ブックマーク取得のためのクエリー */
export const BookmarkQuery = {
  type: "object",
  properties: {
    topicId: { type: "number" },
    tagId: { type: "number" },
    isAllUsers: { type: "boolean" },
  },
  additionalProperties: false,
  oneOf: [{ required: ["topicId"] }, { required: ["tagId"] }],
  required: ["isAllUsers"],
} as const;

/** ブックマーク取得のためのクエリー */
export type BookmarkQuery = FromSchema<typeof BookmarkQuery>;
