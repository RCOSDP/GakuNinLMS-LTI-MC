import { User } from "@prisma/client";
import { TopicProps } from "$server/models/topic";
import topicInput from "./topicInput";
import resourceCreateInput from "./resourceCreateInput";

function topicCreateInput(creatorId: User["id"], topic: TopicProps) {
  const { where, create } = resourceCreateInput(topic.resource);
  const input = {
    ...topicInput(creatorId, topic),
    resource: { connectOrCreate: { where, create } },
  };

  return input;
}

export default topicCreateInput;
