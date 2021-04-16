import topic from "./topic";
import activity from "./activity";
import type { ActivitiesByTopicSchema } from "$server/models/activitiesByTopic";

const activitiesByTopic: ActivitiesByTopicSchema = {
  id: topic.id,
  name: topic.name,
  activities: [...Array(108)].map(() => activity),
  completedCount: 80,
};

export default activitiesByTopic;
