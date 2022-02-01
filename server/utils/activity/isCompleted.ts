import type { TopicSchema } from "$server/models/topic";
import type { ActivitySchema } from "$server/models/activity";
import { ACTIVITY_RATE_MIN } from "$server/utils/env";

/**
 * 学習完了か否かの判定
 * @param topic 学習対象のトピック
 * @param activity 学習活動
 * @returns 完了: true, それ以外: false
 */
function isCompleted(
  topic: Pick<TopicSchema, "timeRequired">,
  activity: Pick<ActivitySchema, "totalTimeMs">
): boolean {
  const totalTime = activity.totalTimeMs / 1_000;
  const completedRate = totalTime / topic.timeRequired;
  return ACTIVITY_RATE_MIN <= completedRate;
}

export default isCompleted;
