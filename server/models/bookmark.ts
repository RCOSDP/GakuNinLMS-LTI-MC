import type { JSONSchema } from "json-schema-to-ts";
import { TagLabel } from "@prisma/client";
import type { Bookmark, Prisma } from "@prisma/client";
import { UserSchema } from "./user";
import { topicSchema } from "./topic";

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

export type BookMarkProps = Prisma.BookmarkCreateInput;

export const bookMarkProps = {
  type: "object",
  properties: {
    id: { type: "integer" },
    user: UserSchema,
    topic: topicSchema,
    tag: tagSchema,
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

export type BookSchema = Bookmark;
