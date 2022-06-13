import type { TopicSchema } from "$server/models/topic";
import prisma from "$server/utils/prisma";
import makeSortOrderQuery from "$server/utils/makeSortOrderQuery";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "./topicToTopicSchema";

async function findTopics(
  sort = "updated",
  page: number,
  perPage: number,
  ip: string
): Promise<TopicSchema[]> {
  const topics = await prisma.topic.findMany({
    ...topicsWithResourcesArg,
    orderBy: makeSortOrderQuery(sort),
    skip: page * perPage,
    take: perPage,
  });

  return topics.map((topic) => topicToTopicSchema(topic, ip));
}

export default findTopics;
