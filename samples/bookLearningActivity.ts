import book from "./book";
import bookLearnerActivity from "./bookLearnerActivity";
import topicLearningActivity from "./topicLearningActivity";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";

const bookLearningActivity: BookLearningActivitySchema = {
  id: book.id,
  name: book.name,
  bookLearnerActivities: [...Array(10)].map(() => bookLearnerActivity),
  topicLearningActivities: [topicLearningActivity],
  totalLearnerCount: 160,
  completedCount: 40,
  incompletedCount: 80,
};

export default bookLearningActivity;
