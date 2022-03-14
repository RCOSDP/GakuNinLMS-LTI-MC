import type { FromSchema } from "json-schema-to-ts";
import { LearnerSchema } from "./learner";

/** 学習活動 */
export const ActivitySchema = {
  type: "object",
  properties: {
    learner: LearnerSchema,
    topic: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        timeRequired: { type: "integer" },
      },
      required: ["id", "name", "timeRequired"],
      additionalProperties: false,
    },
    /** 学習状況 - 完了: true, それ以外: false */
    completed: { type: "boolean" },
    /** 合計学習時間 (ms) */
    totalTimeMs: { type: "integer" },
    /** 作成日時 */
    createdAt: { type: "string", format: "date-time" },
    /** 更新日時 */
    updatedAt: { type: "string", format: "date-time" },
  },
  required: [
    "learner",
    "topic",
    "completed",
    "totalTimeMs",
    "createdAt",
    "updatedAt",
  ],
  additionalProperties: false,
} as const;

/** 学習活動 */
export type ActivitySchema = Pick<
  FromSchema<typeof ActivitySchema>,
  "learner" | "topic" | "completed" | "totalTimeMs"
> & {
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
};
