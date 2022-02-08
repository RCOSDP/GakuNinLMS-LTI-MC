import type { User, Topic } from "@prisma/client";
import type { ActivityProps } from "$server/models/activity";
import upsertActivity from "./upsertActivity";

/** トピックでの学習活動の挿入 */
function upsertTopicActivity({
  learnerId,
  topicId,
  activity,
}: {
  learnerId: User["id"];
  topicId: Topic["id"];
  activity: ActivityProps;
}) {
  return upsertActivity({
    learnerId,
    topicId,
    ltiConsumerId: "",
    ltiContextId: "",
    activity,
  });
}

export default upsertTopicActivity;
