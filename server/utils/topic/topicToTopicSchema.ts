import { Prisma } from "@prisma/client";
import { TopicSchema } from "$server/models/topic";
import { AuthorSchema } from "$server/models/author";
import {
  resourceWithVideoArg,
  resourceToResourceSchema,
} from "$server/utils/resource/toSchema";

export const topicsWithResourcesArg = {
  include: { creator: true, resource: resourceWithVideoArg },
} as const;

export type TopicWithResource = Prisma.TopicGetPayload<
  typeof topicsWithResourcesArg
>;

export function topicToTopicSchema(topic: TopicWithResource): TopicSchema {
  return {
    ...topic,
    // TODO: 複数著者に対応してほしい
    authors: [{ ...topic.creator, roleName: AuthorSchema._roleNames.author }],
    resource: resourceToResourceSchema(topic.resource),
  };
}
