import type { TopicProps } from "$server/models/topic";

function topicInput(topic: TopicProps) {
  return {
    ...topic,
    details: {},
    updatedAt: new Date(),
  };
}

export default topicInput;
