import useSWR, { mutate } from "swr";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import { api } from "./api";

const key = "/api/v2/topic/{topic_id}";

async function fetchTopic(_: typeof key, id: TopicSchema["id"]) {
  const res = await api.apiV2TopicTopicIdGet({ topicId: id });
  return res as TopicSchema;
}

export function useTopic(id: TopicSchema["id"]) {
  const { data } = useSWR<TopicSchema>([key, id], fetchTopic);
  return data;
}

export async function createTopic(body: TopicProps): Promise<TopicSchema> {
  const res = await api.apiV2TopicPost({ body });
  await mutate([key, res.id], res);
  return res as TopicSchema;
}

export async function updateTopic({
  id,
  ...body
}: TopicProps & { id: TopicSchema["id"] }): Promise<TopicSchema> {
  const res = await api.apiV2TopicTopicIdPut({ topicId: id, body });
  await mutate([key, res.id], res);
  return res as TopicSchema;
}

export async function destroyTopic(id: TopicSchema["id"]) {
  await api.apiV2TopicTopicIdDelete({ topicId: id });
}

export function revalidateTopic(id: TopicSchema["id"]): Promise<TopicSchema> {
  return mutate([key, id]);
}
