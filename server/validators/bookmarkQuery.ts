import type { FromSchema } from "json-schema-to-ts";

/** ブックマーク取得のためのクエリー */
export const BookmarkQuery = {
  type: "object",
  properties: {
    topicId: { type: "number" },
    isAllUsers: { type: "boolean" },
  },
  additionalProperties: false,
  required: ["topicId", "isAllUsers"],
} as const;

/** ブックマーク取得のためのクエリー */
export type BookmarkQuery = FromSchema<typeof BookmarkQuery>;
