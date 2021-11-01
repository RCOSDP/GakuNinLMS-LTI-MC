import type { FromSchema } from "json-schema-to-ts";

export const LtiResourceLinkRequestSchema = {
  title: "LTI Resource Link Request",
  type: "object",
  required: ["id"],
  properties: {
    id: { title: "LTI Resource Link ID", type: "string" },
    title: { title: "Title", type: "string" },
  },
  additionalProperties: false,
} as const;

/** LTI Resource Link Request */
export type LtiResourceLinkRequestSchema = FromSchema<
  typeof LtiResourceLinkRequestSchema
>;
