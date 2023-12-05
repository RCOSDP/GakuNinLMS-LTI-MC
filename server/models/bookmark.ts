import type { FromSchema, JSONSchema } from "json-schema-to-ts";
import type { Tag } from "@prisma/client";
import { type TopicSchema } from "./topic";
import { LtiContextSchema } from "./ltiContext";

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
  required: ["id", "topicId", "tagId", "userId", "tag", "topic", "ltiContext"],
  properties: {
    id: { type: "integer" },
    topicId: { type: "integer" },
    tagId: { type: "integer" },
    userId: { type: "integer" },
    tag: TagSchema,
    topic: {
      type: "object",
      required: ["id", "name", "timeRequired", "bookmarks"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        timeRequired: { type: "integer" },
        bookmarks: {
          type: "array",
          items: {
            type: "object",
            required: ["id", "updatedAt", "tag"],
            properties: {
              id: { type: "integer" },
              updatedAt: { type: "string" },
              tag: TagSchema,
            },
            additionalProperties: false,
          },
        },
      },
    },
    ltiContext: LtiContextSchema,
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
