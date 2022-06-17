import useSWR, { mutate } from "swr";
import type { TopicPropsWithUpload, TopicSchema } from "$server/models/topic";
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

export async function createTopic(
  body: TopicPropsWithUpload
): Promise<TopicSchema> {
  // eslint-disable-next-line tsc/config
  const res = (await api.apiV2TopicPost({ body })) as TopicSchema;
  await revalidateTopic(res.id, res);
  return res;
}

export async function updateTopic({
  id,
  ...body
}: TopicPropsWithUpload & { id: TopicSchema["id"] }): Promise<TopicSchema> {
  const res = (await api.apiV2TopicTopicIdPut({
    topicId: id,
    // eslint-disable-next-line tsc/config
    body,
  })) as TopicSchema;
  await revalidateTopic(res.id, res);
  return res;
}

export async function destroyTopic(id: TopicSchema["id"]) {
  await api.apiV2TopicTopicIdDelete({ topicId: id });
}

export function revalidateTopic(
  id: TopicSchema["id"],
  res?: TopicSchema
): Promise<TopicSchema> {
  return mutate([key, id], res);
}
