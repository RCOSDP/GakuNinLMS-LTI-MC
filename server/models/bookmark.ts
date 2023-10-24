import type { JSONSchema } from "json-schema-to-ts";
import type { Bookmark, Tag, Topic } from "@prisma/client";
import { topicSchema, type TopicSchema } from "./topic";

export const tagSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    label: { type: "string" },
    color: { type: "string" },
  },
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
  tag: Tag;
};

export const bookmarkSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    topic: topicSchema,
    tag: tagSchema,
  },
  additionalProperties: false,
} as const satisfies JSONSchema;
