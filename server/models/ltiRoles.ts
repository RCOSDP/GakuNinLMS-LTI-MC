import type { FromSchema } from "json-schema-to-ts";

export const LtiRolesSchema = {
  title: "LTI Roles - LTI バージョンに対応する語彙の文字列の配列",
  type: "array",
  items: { type: "string" },
} as const;

/** LTI Roles - LTI バージョンに対応する語彙の文字列の配列 */
export type LtiRolesSchema = FromSchema<typeof LtiRolesSchema>;
