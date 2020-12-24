import { User, Topic } from "@prisma/client";
import { TopicProps, TopicSchema } from "$server/models/topic";
import prisma from "$server/utils/prisma";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "./topicToTopicSchema";
import topicInput from "./topicInput";
import resourceConnectOrCreateInput from "./resourceConnectOrCreateInput";
import topicCreateInput from "./topicCreateInput";

function topicUpdateInput(creatorId: User["id"], topic: TopicProps) {
  const input = {
    ...topicInput(creatorId, topic),
    resource: resourceConnectOrCreateInput(topic.resource),
  };

  return input;
}

async function upsertTopic(
  creatorId: User["id"],
  { id, ...topic }: TopicProps & { id: Topic["id"] }
): Promise<TopicSchema | undefined> {
  const upsert = prisma.topic.upsert({
    where: { id },
    create: topicCreateInput(creatorId, topic),
    update: topicUpdateInput(creatorId, topic),
  });
  const find = prisma.topic.findUnique({
    ...topicsWithResourcesArg,
    where: { id },
  });
  const [, created] = await prisma.$transaction([upsert, find]);

  if (!created) return;

  return topicToTopicSchema(created);
}

export default upsertTopic;
