import { TopicSchema } from "$server/models/topic";
import prisma from "$server/utils/prisma";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "./topicToTopicSchema";

async function findTopics(
  page: number,
  perPage: number
): Promise<TopicSchema[]> {
  const topics = await prisma.topic.findMany({
    ...topicsWithResourcesArg,
    skip: page * perPage,
    take: perPage,
  });

  return topics.map(topicToTopicSchema);
}

export default findTopics;
