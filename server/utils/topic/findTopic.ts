import { Topic } from "@prisma/client";
import { TopicSchema } from "$server/models/topic";
import prisma from "$server/utils/prisma";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "./topicToTopicSchema";

async function findTopic(
  topicId: Topic["id"]
): Promise<TopicSchema | undefined> {
  const topic = await prisma.topic.findUnique({
    ...topicsWithResourcesArg,
    where: { id: topicId },
  });
  if (topic == null) return;

  return topicToTopicSchema(topic);
}

export default findTopic;
