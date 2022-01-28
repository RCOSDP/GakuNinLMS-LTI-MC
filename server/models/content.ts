import type { TopicSchema as TopicSchemaBase } from "$server/models/topic";
import { topicSchema } from "$server/models/topic";
import type { BookSchema as BookSchemaBase } from "$server/models/book";
import { bookSchema } from "$server/models/book";

// TODO: oneOf/anyOf がオブジェクトでも機能するようになれば使いたい
//       https://github.com/fastify/fast-json-stringify/issues/290
export const ContentSchema = {
  type: "object",
  required: ["type"],
  properties: {
    type: { type: "string" },
    ...topicSchema.properties,
    ...bookSchema.properties,
  },
  additionalProperties: false,
} as const;

type TopicSchema = TopicSchemaBase & {
  /** コンテンツ種別 (トピックの場合: "topic"、ブックの場合: "book") */
  type: "topic";
};

type BookSchema = BookSchemaBase & {
  /** コンテンツ種別 (トピックの場合: "topic"、ブックの場合: "book") */
  type: "book";
};

export type ContentSchema = TopicSchema | BookSchema;

export type ContentAuthors = Pick<ContentSchema, "authors">;

export type IsContentEditable = (content: ContentAuthors) => boolean;
