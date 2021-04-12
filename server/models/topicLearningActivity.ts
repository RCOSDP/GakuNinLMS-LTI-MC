import type { TopicSchema } from "$server/models/topic";
import type { ActivitySchema } from "$server/models/activity";

export type TopicLearningActivitySchema = Pick<TopicSchema, "id" | "name"> & {
  activities: ActivitySchema[];
  totalLearnerCount: number;
  completedCount: number;
  incompletedCount: number;
};
