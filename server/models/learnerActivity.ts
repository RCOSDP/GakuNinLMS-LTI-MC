import type { UserSchema } from "$server/models/user";
import type { ActivitySchema } from "$server/models/activity";

export type LearnerActivitySchema = Pick<UserSchema, "id" | "name"> & {
  activities: Omit<ActivitySchema, "learner">[];
};
