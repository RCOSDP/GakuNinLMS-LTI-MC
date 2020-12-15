import { User, Topic } from "@prisma/client";
import { TopicProps } from "$server/models/topic";
import { ResourceProps } from "$server/models/resource";
import { parse } from "$server/utils/videoResource";
import prisma from "../prisma";

function resourceInput(resource: ResourceProps) {
  const videoProviderUrl = parse(resource.url)?.providerUrl;
  const videoCreateInput =
    videoProviderUrl == null
      ? undefined
      : { create: { providerUrl: videoProviderUrl, tracks: {} } };
  const resourceInput = {
    url: resource.url,
    details: {},
    video: videoCreateInput,
  };

  return {
    where: { url: resourceInput.url },
    create: resourceInput,
    update: resourceInput,
  };
}

function topicInput(creatorId: User["id"], topic: TopicProps) {
  return {
    ...topic,
    details: {},
    creator: { connect: { id: creatorId } },
  };
}

function topicCreateInput(creatorId: User["id"], topic: TopicProps) {
  const { where, create } = resourceInput(topic.resource);
  const topicCreateInput = {
    ...topicInput(creatorId, topic),
    resource: { connectOrCreate: { where, create } },
  };

  return topicCreateInput;
}

function topicUpdateInput(creatorId: User["id"], topic: TopicProps) {
  const input = {
    ...topicInput(creatorId, topic),
    resource: { upsert: resourceInput(topic.resource) },
  };

  return input;
}

async function upsertTopic(
  creatorId: User["id"],
  topic: TopicProps & { id: Topic["id"] }
) {
  prisma.topic.upsert({
    where: { id: topic.id },
    create: topicCreateInput(creatorId, topic),
    update: topicUpdateInput(creatorId, topic),
  });
}

export default upsertTopic;
