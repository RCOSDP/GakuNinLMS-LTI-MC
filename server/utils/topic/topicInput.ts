import { User } from "@prisma/client";
import { TopicProps } from "$server/models/topic";

function topicInput(creatorId: User["id"], topic: TopicProps) {
  return {
    ...topic,
    details: {},
    creator: { connect: { id: creatorId } },
    updatedAt: new Date(),
  };
}

export default topicInput;
