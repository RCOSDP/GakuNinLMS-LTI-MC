import topic from "./topic";
import activity from "./activity";
import type { TopicLearningActivitySchema } from "$server/models/topicLearningActivity";

const topicLearningActivity: TopicLearningActivitySchema = {
  id: topic.id,
  name: topic.name,
  activities: [activity],
  totalLearnerCount: 160,
  completedCount: 80,
  incompletedCount: 52,
};

export default topicLearningActivity;
