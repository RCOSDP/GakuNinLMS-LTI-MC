import { FromSchema } from "json-schema-to-ts";

/** 学習者 */
export const LearnerSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    /** 氏名 */
    name: { type: "string" },
  },
  required: ["id", "name"],
} as const;

/** 学習者 */
export type LearnerSchema = FromSchema<typeof LearnerSchema>;
