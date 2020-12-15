import { User } from "@prisma/client";
import { TopicProps } from "$server/models/topic";

function topicInput(creatorId: User["id"], topic: TopicProps) {
  return {
    ...topic,
    details: {},
    creator: { connect: { id: creatorId } },
  };
}

export default topicInput;
