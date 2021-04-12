import {
  ActivityTimeRangeProps,
  activityTimeRangePropsSchema,
} from "./activityTimeRange";
import type { UserSchema } from "$server/models/user";
import type { TopicSchema } from "$server/models/topic";

export type ActivityProps = {
  timeRanges: ActivityTimeRangeProps[];
};

export const activityPropsSchema = {
  type: "object",
  properties: {
    timeRanges: {
      type: "array",
      items: activityTimeRangePropsSchema,
    },
  },
};

export type ActivitySchema = {
  learner: Pick<UserSchema, "id" | "name">;
  topic: Pick<TopicSchema, "id" | "name">;
  completed: boolean;
  totalTimeMs: number;
  createdAt: Date;
  updatedAt: Date;
};
