import { User } from "@prisma/client";
import { TopicProps } from "$server/models/topic";
import topicInput from "./topicInput";
import resourceConnectOrCreateInput from "./resourceConnectOrCreateInput";

function topicCreateInput(creatorId: User["id"], topic: TopicProps) {
  const input = {
    ...topicInput(creatorId, topic),
    resource: resourceConnectOrCreateInput(topic.resource),
  };

  return input;
}

export default topicCreateInput;
