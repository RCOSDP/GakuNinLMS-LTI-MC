import type { BookSchema } from "./book";
import type { TopicSchema } from "./topic";

/** 受講コースのブック */
export type CourseBookSchema = Pick<BookSchema, "id" | "name"> & {
  sections: Array<{ topics: Array<Pick<TopicSchema, "id" | "name">> }>;
};
