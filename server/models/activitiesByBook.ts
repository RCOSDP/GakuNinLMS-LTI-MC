import type { BookSchema } from "$server/models/book";

export type ActivitiesByBookSchema = Pick<BookSchema, "id" | "name"> & {
  completedCount: number;
  incompletedCount: number;
};
