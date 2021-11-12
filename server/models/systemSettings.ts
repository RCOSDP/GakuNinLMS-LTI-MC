import { FromSchema } from "json-schema-to-ts";

export const SystemSettingsSchema = {
  title: "System Settings",
  type: "object",
  required: ["zoomImportEnabled"],
  properties: {
    zoomImportEnabled: { title: "zoomImportEnabled", type: "boolean" },
  },
  additionalProperties: false,
} as const;

export type SystemSettingsSchema = FromSchema<typeof SystemSettingsSchema>;
