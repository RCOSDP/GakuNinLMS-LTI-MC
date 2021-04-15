import type { UserSchema } from "$server/models/user";
import type { BookLearnerActivitySchema } from "$server/models/bookLearnerActivity";

export type LearnerActivitySchema = Pick<UserSchema, "id" | "name"> & {
  bookLearnerActivities: BookLearnerActivitySchema[];
};
