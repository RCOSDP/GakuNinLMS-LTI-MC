import type { FromSchema } from "json-schema-to-ts";

/** System Settings */
export const SystemSettingsSchema = {
  type: "object",
  required: ["zoomImportEnabled"],
  properties: {
    zoomImportEnabled: { type: "boolean" },
  },
  additionalProperties: false,
} as const;

/** System Settings */
export type SystemSettingsSchema = FromSchema<typeof SystemSettingsSchema>;
