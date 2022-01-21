import type { FromSchema } from "json-schema-to-ts";

/**
 * 埋め込み情報
 * @todo oneOf/anyOf がオブジェクトでも機能するようになれば使いたい
 *       https://github.com/fastify/fast-json-stringify/issues/290
 */
export const OembedSchema = {
  type: "object",
  required: ["type", "version"],
  properties: {
    type: { type: "string" },
    version: { type: "string", enum: ["1.0"] },
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
} as const;

/** 埋め込み情報 */
export type OembedSchema = FromSchema<typeof OembedSchema>;
