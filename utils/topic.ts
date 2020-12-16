import useSWR from "swr";
import { api } from "./api";
import { TopicSchema } from "$server/models/topic";

const key = "/api/v2/topic/{topic_id}";

async function fetchTopic(_: typeof key, topicId: TopicSchema["id"]) {
  const res = await api.apiV2TopicTopicIdGet({ topicId });
  return res as TopicSchema;
}

export function useTopic(topicId: TopicSchema["id"]) {
  const { data } = useSWR<TopicSchema>([key, topicId], fetchTopic);
  return data;
}
