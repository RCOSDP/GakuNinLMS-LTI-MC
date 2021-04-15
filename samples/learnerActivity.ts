import user from "./user";
import bookLearnerActivity from "./bookLearnerActivity";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";

const learnerActivity: LearnerActivitySchema = {
  id: user.id,
  name: user.name,
  bookLearnerActivities: [...Array(10)].map(() => bookLearnerActivity),
};

export default learnerActivity;
