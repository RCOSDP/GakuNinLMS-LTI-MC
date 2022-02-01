import type { FromSchema } from "json-schema-to-ts";

export const OauthClientSchema = {
  title: "OAuth 2.0 Client",
  type: "object",
  required: ["id", "nonce"],
  properties: {
    id: { title: "Client ID", type: "string" },
    nonce: { title: "nonce", type: "string" },
  },
  additionalProperties: false,
} as const;

/** OAuth 2.0 Client */
export type OauthClientSchema = FromSchema<typeof OauthClientSchema>;
