import { FromSchema } from "json-schema-to-ts";

export const LtiUserSchema = {
  title: "LTI User",
  type: "object",
  required: ["id"],
  properties: {
    id: { title: "End-User ID", type: "string" },
    name: { title: "End-User's full name in displayable", type: "string" },
  },
  additionalProperties: false,
} as const;

/** LTI User */
export type LtiUserSchema = FromSchema<typeof LtiUserSchema>;
