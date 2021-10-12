import { User } from "@prisma/client";
import { TopicProps } from "$server/models/topic";
import topicInput from "./topicInput";
import resourceConnectOrCreateInput from "./resourceConnectOrCreateInput";

function createInput(userId: User["id"], topic: TopicProps) {
  return {
    ...topicInput(topic),
    authors: { create: { userId, roleId: 1 } },
    creator: { connect: { id: userId } },
  };
}

function topicCreateInput(creatorId: User["id"], topic: TopicProps) {
  const input = {
    ...createInput(creatorId, topic),
    resource: resourceConnectOrCreateInput(topic.resource),
  };

  return input;
}

export default topicCreateInput;
