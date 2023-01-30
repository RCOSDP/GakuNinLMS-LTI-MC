import type { FromSchema } from "json-schema-to-ts";
import { LtiContextSchema } from "./ltiContext";
import { LtiMembersSchema } from "./ltiMembers";
import { LtiNrpsContextMemberSchema } from "./ltiNrpsContextMember";

export const LtiNrpsContextMembershipSchema = {
  title:
    "Learning Tools Interoperability Names and Role Provisioning Services 2.0 Context Memberships",
  type: "object",
  required: ["id", "context", "members"],
  properties: {
    id: { title: "LMS memberships URL", type: "string" },
    context: LtiContextSchema,
    members: { type: "array", items: LtiNrpsContextMemberSchema },
    currentLtiMembers: LtiMembersSchema,
  },
  additionalProperties: false,
} as const;

/** Learning Tools Interoperability Names and Role Provisioning Services 2.0 Context Memberships */
export type LtiNrpsContextMembershipSchema = FromSchema<
  typeof LtiNrpsContextMembershipSchema
>;
