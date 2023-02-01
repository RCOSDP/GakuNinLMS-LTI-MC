import type { FromSchema } from "json-schema-to-ts";

export const LtiNrpsContextMemberSchema = {
  title: "LTI-NRPS 2.0 Context Membershipsのmembersプロパティの要素",
  type: "object",
  required: ["roles", "user_id"],
  properties: {
    roles: { type: "array", items: { type: "string" } },
    user_id: { type: "string" },
    lis_person_sourcedid: { type: "string" },
    name: { type: "string" },
    given_name: { type: "string" },
    family_name: { type: "string" },
    email: { type: "string" },
  },
} as const;

/** LTI-NRPS 2.0 Context Membershipsのmembersプロパティの要素 */
export type LtiNrpsContextMemberSchema = FromSchema<
  typeof LtiNrpsContextMemberSchema
>;
