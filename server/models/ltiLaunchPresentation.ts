import { FromSchema } from "json-schema-to-ts";

export const LtiLaunchPresentationSchema = {
  title: "LTI Launch Presentation",
  type: "object",
  properties: {
    returnUrl: { title: "return_url", type: "string" },
  },
  additionalProperties: false,
} as const;

/** LTI Launch Presentation */
export type LtiLaunchPresentationSchema = FromSchema<
  typeof LtiLaunchPresentationSchema
>;
