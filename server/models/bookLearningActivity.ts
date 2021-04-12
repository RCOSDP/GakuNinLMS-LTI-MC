import type { BookSchema } from "$server/models/book";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";
import type { TopicLearningActivitySchema } from "$server/models/topicLearningActivity";

export type BookLearningActivitySchema = Pick<BookSchema, "id" | "name"> & {
  learnerActivities: LearnerActivitySchema[];
  topicLearningActivities: TopicLearningActivitySchema[];
  totalLearnerCount: number;
  completedCount: number;
  incompletedCount: number;
};
