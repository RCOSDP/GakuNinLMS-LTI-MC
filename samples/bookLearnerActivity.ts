import user from "./user";
import book from "./book";
import topic from "./topic";
import type { BookLearnerActivitySchema } from "$server/models/bookLearnerActivity";

const bookLearnerActivity: BookLearnerActivitySchema = {
  id: user.id,
  name: user.name,
  book: {
    id: book.id,
    name: book.name,
  },
  activities: [...Array(10)].map(() => ({
    topic: {
      ...topic,
      id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    },
    completed: Math.random() > 0.5,
    totalTimeMs: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
};

export default bookLearnerActivity;
