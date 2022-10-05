import type { FromSchema } from "json-schema-to-ts";

export const LtiAgsEndpointSchema = {
  title: "LTI Assignment and Grade Services 2.0 Endpoint",
  type: "object",
  properties: {
    lineitems: { type: "string" },
    lineitem: { type: "string" },
    scope: { type: "array", items: { type: "string" } },
  },
  additionalProperties: false,
} as const;

/** LTI Assignment and Grade Services 2.0 Endpoint */
export type LtiAgsEndpointSchema = FromSchema<typeof LtiAgsEndpointSchema>;
