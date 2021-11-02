import type { FromSchema } from "json-schema-to-ts";

export const UserSettingsProps = {
  type: "object",
  properties: {
    zoomImportEnabled: { type: "boolean" },
  },
  additionalProperties: false,
} as const;

export type UserSettingsProps = FromSchema<typeof UserSettingsProps>;
