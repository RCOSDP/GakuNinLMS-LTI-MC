import type { FromSchema } from "json-schema-to-ts";

/** 学習活動のビデオ視聴時間 */
export const ActivityTimeRangeSchema = {
  type: "object",
  required: ["activityId"],
  properties: {
    activityId: { type: "integer" },
    startMs: { type: "integer" },
    endMs: { type: "integer" },
  },
  additionalProperties: false,
} as const;

/** 学習活動のビデオ視聴時間 */
export type ActivityTimeRangeSchema = FromSchema<
  typeof ActivityTimeRangeSchema
>;
