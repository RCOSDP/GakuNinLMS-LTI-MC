import type { FromSchema } from "json-schema-to-ts";

export const ActivityTimeRangeProps = {
  type: "object",
  required: ["startMs", "endMs"],
  properties: {
    startMs: { type: "integer" },
    endMs: { type: "integer" },
  },
  additionalProperties: false,
} as const;

export type ActivityTimeRangeProps = FromSchema<typeof ActivityTimeRangeProps>;
