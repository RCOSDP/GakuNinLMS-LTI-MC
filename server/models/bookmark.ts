import type { JSONSchema } from "json-schema-to-ts";
import { TagLabel } from "@prisma/client";
import type { Bookmark, Tag, Topic, User } from "@prisma/client";
import { UserSchema } from "./user";
import { topicSchema, type TopicSchema } from "./topic";

export const tagSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    label: {
      enum: [
        TagLabel.INTERESTING,
        TagLabel.IMPORTANT,
        TagLabel.DIFFICULT,
        TagLabel.LATER,
      ],
    },
    color: { type: "string" },
  },
} as const satisfies JSONSchema;

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
  user: User;
  topic: Topic;
  tag: Tag;
};

export const bookmarkSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    user: UserSchema,
    topic: topicSchema,
    tag: tagSchema,
  },
  additionalProperties: false,
} as const satisfies JSONSchema;
