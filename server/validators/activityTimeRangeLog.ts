import type { FromSchema } from "json-schema-to-ts";

export const ActivityTimeRangeLogProps = {
  type: "object",
  required: ["startMs", "endMs"],
  properties: {
    startMs: { type: "integer" },
    endMs: { type: "integer" },
  },
  additionalProperties: false,
} as const;

export type ActivityTimeRangeLogProps = FromSchema<typeof ActivityTimeRangeLogProps>;
