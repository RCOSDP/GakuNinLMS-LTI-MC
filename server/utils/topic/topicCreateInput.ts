import { User } from "@prisma/client";
import { TopicProps } from "$server/models/topic";
import topicInput from "./topicInput";
import resourceCreateInput from "./resourceCreateInput";

function topicCreateInput(creatorId: User["id"], topic: TopicProps) {
  const { create } = resourceCreateInput(topic.resource);
  const input = {
    ...topicInput(creatorId, topic),
    resource: {
      connectOrCreate: { where: { url: topic.resource.url }, create },
    },
  };

  return input;
}

export default topicCreateInput;
