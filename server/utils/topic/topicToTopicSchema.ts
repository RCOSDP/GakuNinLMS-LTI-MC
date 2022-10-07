import type { Book, Prisma } from "@prisma/client";
import type { TopicSchema } from "$server/models/topic";
import {
  authorArg,
  authorToAuthorSchema,
} from "$server/utils/author/authorToAuthorSchema";
import {
  resourceWithVideoArg,
  resourceToResourceSchema,
} from "$server/utils/resource/toSchema";

export const topicsWithResourcesArg = {
  include: {
    authors: authorArg,
    resource: resourceWithVideoArg,
    keywords: true,
    topicSection: { include: { section: { include: { book: true } } } },
  },
} as const;

export type TopicWithResource = Prisma.TopicGetPayload<
  typeof topicsWithResourcesArg
>;

/**
 * TopicSchemaへの変換
 * @param topicWithResource データベースで扱われるリソース含むTopic
 * @param ip req.ip
 * @param options オプション
 * @param options.relatedBooksMap トピックに関連するブックの集合
 */
export function topicToTopicSchema(
  { topicSection, ...topic }: TopicWithResource,
  ip: string,
  options?: {
    relatedBooksMap: Map<Book["id"], Book>;
  }
): TopicSchema {
  return {
    ...topic,
    authors: topic.authors.map(authorToAuthorSchema),
    resource: resourceToResourceSchema(topic.resource, ip),
    relatedBooks:
      options &&
      topicSection
        .map((ts) => ts.section.book)
        .filter((book) => options.relatedBooksMap.has(book.id)),
  };
}
