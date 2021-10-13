import { Prisma } from "@prisma/client";
import { TopicSchema } from "$server/models/topic";
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
  },
} as const;

export type TopicWithResource = Prisma.TopicGetPayload<
  typeof topicsWithResourcesArg
>;

export function topicToTopicSchema(topic: TopicWithResource): TopicSchema {
  return {
    ...topic,
    authors: topic.authors.map(authorToAuthorSchema),
    resource: resourceToResourceSchema(topic.resource),
  };
}
