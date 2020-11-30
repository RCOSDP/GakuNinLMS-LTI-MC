import { UserProps } from "$server/models/user";
import { TopicSchema } from "$server/models/topic";
import prisma from "./prisma";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "./topicToTopicSchema";

export async function upsertUser(user: UserProps) {
  return await prisma.user.upsert({
    where: { ltiUserId: user.ltiUserId },
    create: user,
    update: user,
  });
}

export async function findTopics(
  page: number,
  perPage: number
): Promise<TopicSchema[]> {
  const topics = await prisma.topic.findMany({
    skip: page * perPage,
    take: perPage,
    include: topicsWithResourcesArg,
  });

  return topics.map(topicToTopicSchema);
}
