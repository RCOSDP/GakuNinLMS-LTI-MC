import type { BookSchema } from "./book";
import type { ActivitySchema } from "./activity";
import type { LearningStatus } from "./learningStatus";

export type BookActivitySchema = Pick<ActivitySchema, "learner" | "topic"> & {
  book: Pick<BookSchema, "id" | "name">;
  status: LearningStatus;
};
