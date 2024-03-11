import type { FromSchema } from "json-schema-to-ts";

export const ActivityTimeRangeLogProps = {
  type: "object",
  required: ["startMs", "endMs"],
  properties: {
    id: { type: "number" },
    startMs: { type: "integer" },
    endMs: { type: "integer" },
    createdAt,
    updatedAt,
  },
  additionalProperties: false,
} as const;

export type ActivityTimeRangeLogProps = FromSchema<
  typeof ActivityTimeRangeLogProps
>;
