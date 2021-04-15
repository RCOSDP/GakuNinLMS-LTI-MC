import type { UserSchema } from "$server/models/user";
import type { ActivitySchema } from "$server/models/activity";
import type { BookSchema } from "./book";

export type BookLearnerActivitySchema = Pick<UserSchema, "id" | "name"> & {
  book: Pick<BookSchema, "id" | "name">;
  activities: Omit<ActivitySchema, "learner">[];
};
