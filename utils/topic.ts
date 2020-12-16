import useSWR from "swr";
import { api } from "./api";
import { TopicSchema } from "$server/models/topic";

const key = "/api/v2/topic/{topic_id}";

async function fetchTopic(_: typeof key, id: TopicSchema["id"]) {
  const res = await api.apiV2TopicTopicIdGet({ topicId: id });
  return res as TopicSchema;
}

export function useTopic(id: TopicSchema["id"]) {
  const { data } = useSWR<TopicSchema>([key, id], fetchTopic);
  return data;
}
