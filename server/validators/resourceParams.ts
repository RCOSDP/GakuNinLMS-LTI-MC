import type { FromSchema } from "json-schema-to-ts";

export const ResourceParams = {
  type: "object",
  required: ["resource_id"],
  properties: {
    resource_id: { type: "number" },
  },
  additionalProperties: false,
} as const;

export type ResourceParams = FromSchema<typeof ResourceParams>;
