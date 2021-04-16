import type { TopicSchema } from "$server/models/topic";
import type { ActivitySchema } from "$server/models/activity";

export type ActivitiesByTopicSchema = Pick<TopicSchema, "id" | "name"> & {
  activities: Array<Omit<ActivitySchema, "topic">>;
  completedCount: number;
};
