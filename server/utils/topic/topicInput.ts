import { User } from "@prisma/client";
import { TopicProps } from "$server/models/topic";

function topicInput(userId: User["id"], topic: TopicProps) {
  return {
    ...topic,
    details: {},
    authors: { create: { userId, roleId: 1 } },
    creator: { connect: { id: userId } },
    updatedAt: new Date(),
  };
}

export default topicInput;
