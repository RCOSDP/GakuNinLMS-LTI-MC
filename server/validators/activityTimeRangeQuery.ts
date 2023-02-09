import type { FromSchema } from "json-schema-to-ts";

/** 学習状況取得のためのクエリー */
export const ActivityTimeRangeQuery = {
  type: "object",
  properties: {
    activityId: { type: "integer" },
  },
  required: ["activityId"],
  additionalProperties: false,
} as const;

export type ActivityTimeRangeQuery = FromSchema<typeof ActivityTimeRangeQuery>;
