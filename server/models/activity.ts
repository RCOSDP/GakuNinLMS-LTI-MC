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

/** 学習活動 */
export type ActivitySchema = {
  learner: Pick<UserSchema, "id" | "name">;
  topic: Pick<TopicSchema, "id" | "name">;
  /** 学習状況 - 完了: true, それ以外: false */
  completed: boolean;
  /** 合計学習時間 (ms) */
  totalTimeMs: number;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
};
