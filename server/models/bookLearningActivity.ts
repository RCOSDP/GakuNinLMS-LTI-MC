import type { BookSchema } from "$server/models/book";
import type { BookLearnerActivitySchema } from "$server/models/bookLearnerActivity";
import type { TopicLearningActivitySchema } from "$server/models/topicLearningActivity";

export type BookLearningActivitySchema = Pick<BookSchema, "id" | "name"> & {
  bookLearnerActivities: BookLearnerActivitySchema[];
  topicLearningActivities: TopicLearningActivitySchema[];
  totalLearnerCount: number;
  completedCount: number;
  incompletedCount: number;
};
