import { api } from "./api";

export async function fetchActivityTimeRangeCountByTopic({
  topicId,
}: {
  topicId: number;
}) {
  const res = await api.apiV2ActivityTimeRangeCountByTopicTopicIdGet({
    topicId: topicId,
  });
  return res;
}

export default fetchActivityTimeRangeCountByTopic;
