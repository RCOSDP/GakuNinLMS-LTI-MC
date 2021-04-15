import type { BookSchema } from "./book";
import type { ActivitySchema } from "./activity";
import type { LearningStatus } from "./learningStatus";

/** ブックでの学習活動 */
export type BookActivitySchema = Pick<ActivitySchema, "learner" | "topic"> & {
  /** ブック */
  book: Pick<BookSchema, "id" | "name">;
  /** 学習状況 */
  status: LearningStatus;
};
