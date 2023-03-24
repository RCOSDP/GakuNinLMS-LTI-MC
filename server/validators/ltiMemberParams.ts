import { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";
import type { FromSchema } from "json-schema-to-ts";

export const LtiMemberBodySchema = {
  title: "LTI v1.3 LtiMemberの更新のParams",
  type: "object",
  required: ["members"],
  properties: {
    members: {
      type: "array",
      items: LtiNrpsContextMemberSchema,
    },
  },
} as const;

export type LtiMemberBodySchema = FromSchema<typeof LtiMemberBodySchema>;
