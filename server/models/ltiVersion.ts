import type { FromSchema } from "json-schema-to-ts";

export const LtiVersionSchema = {
  title: "LTI Version - semver.valid な文字列",
  type: "string",
  enum: ["1.0.0", "1.3.0"],
} as const;

/** LTI Version - semver.valid な文字列 */
export type LtiVersionSchema = FromSchema<typeof LtiVersionSchema>;
