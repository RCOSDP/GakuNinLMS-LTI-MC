import type { FromSchema, JSONSchema } from "json-schema-to-ts";
import type { Bookmark, Tag, Topic } from "@prisma/client";
import { topicSchema, type TopicSchema } from "./topic";

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

export type BookmarkSchema = Bookmark & {
  topic: Topic;
  tag: TagSchema;
};

export const bookmarkSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    topic: topicSchema,
    tag: TagSchema,
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

export const BookmarkTagMenu = {
  title: "ブックマークのタグの選択肢",
  type: "array",
  items: TagSchema,
} as const satisfies JSONSchema;

export type BookmarkTagMenu = FromSchema<typeof BookmarkTagMenu>;
