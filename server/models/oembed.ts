import type { FromSchema } from "json-schema-to-ts";

/** 埋め込み情報 */
export const OembedSchema = {
  type: "object",
  required: ["type", "version"],
  properties: {
    type: { type: "string" },
    version: { enum: ["1.0"] },
    title: { type: "string" },
    author_name: { type: "string" },
    author_url: { type: "string" },
    provider_name: { type: "string" },
    provider_url: { type: "string" },
    cache_age: { type: "string" },
    thumbnail_url: { type: "string" },
    thumbnail_width: { type: "number" },
    thumbnail_height: { type: "number" },
    html: { type: "string" },
    width: { type: "number" },
    height: { type: "number" },
  },
  oneOf: [
    {
      required: ["url", "width", "height"],
      properties: {
        type: { enum: ["photo"] },
        url: { type: "string" },
        width: { type: "number" },
        height: { type: "number" },
      },
    },
    {
      required: ["html", "width", "height"],
      properties: {
        type: { enum: ["video", "rich"] },
        html: { type: "string" },
        width: { type: "number" },
        height: { type: "number" },
      },
    },
    {
      properties: {
        type: { enum: ["link"] },
      },
    },
  ],
  additionalProperties: false,
} as const;

/** 埋め込み情報 */
export type OembedSchema = FromSchema<typeof OembedSchema>;
