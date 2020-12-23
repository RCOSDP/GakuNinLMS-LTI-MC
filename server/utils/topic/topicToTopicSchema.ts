import { Prisma } from "@prisma/client";
import { TopicSchema } from "$server/models/topic";
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
  return { ...topic, resource: resourceToResourceSchema(topic.resource) };
}
