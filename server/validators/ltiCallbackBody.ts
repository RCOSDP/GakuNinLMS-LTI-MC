import type { FromSchema } from "json-schema-to-ts";

export const LtiCallbackBody = {
  title: "LTI v1.3 リダイレクトURIのリクエストボディ",
  type: "object",
  required: ["state", "id_token"],
  properties: {
    state: { type: "string" },
    id_token: { type: "string" },
  },
  additionalProperties: false,
} as const;

/** LTI v1.3 リダイレクトURIのリクエストボディ */
export type LtiCallbackBody = FromSchema<typeof LtiCallbackBody>;
