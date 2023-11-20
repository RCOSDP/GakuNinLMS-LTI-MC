import type { FromSchema, JSONSchema } from "json-schema-to-ts";
import type { Tag } from "@prisma/client";
import type { TopicSchema } from "./topic";

export const TagSchema = {
  type: "object",
  required: ["id", "label", "color"],
  properties: {
    id: { type: "integer" },
    label: { type: "string" },
    color: { title: "CSS <color> 値", type: "string" },
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

export type TagSchema = Tag;

export type BookmarkProps = {
  tagId: Tag["id"];
  topicId: TopicSchema["id"];
};

export const bookmarkPropsSchema = {
  type: "object",
  properties: {
    tagId: { type: "integer" },
    topicId: { type: "integer" },
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

export const BookmarkSchema = {
  type: "object",
  required: ["id", "topicId", "tagId", "tag"],
  properties: {
    id: { type: "integer" },
    topicId: { type: "integer" },
    tagId: { type: "integer" },
    tag: TagSchema,
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

export type BookmarkSchema = FromSchema<typeof BookmarkSchema>;

export const BookmarkTagMenu = {
  title: "ブックマークのタグの選択肢",
  type: "array",
  items: TagSchema,
} as const satisfies JSONSchema;

export type BookmarkTagMenu = FromSchema<typeof BookmarkTagMenu>;
