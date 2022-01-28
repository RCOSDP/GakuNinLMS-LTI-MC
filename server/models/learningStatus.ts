import type { FromSchema } from "json-schema-to-ts";

/** 学習状況 - 完了: "completed", 未完了: "incompleted", 未開封: "unopened" */
export const LearningStatus = {
  type: "string",
  enum: ["completed", "incompleted", "unopened"],
} as const;

/** 学習状況 - 完了: "completed", 未完了: "incompleted", 未開封: "unopened" */
export type LearningStatus = FromSchema<typeof LearningStatus>;
