import book from "./book";
import topicLearningActivity from "./topicLearningActivity";
import learnerActivity from "./learnerActivity";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";

const bookLearningActivity: BookLearningActivitySchema = {
  id: book.id,
  name: book.name,
  learnerActivities: [learnerActivity],
  topicLearningActivities: [topicLearningActivity],
  totalLearnerCount: 160,
  completedCount: 40,
  incompletedCount: 80,
};

export default bookLearningActivity;
