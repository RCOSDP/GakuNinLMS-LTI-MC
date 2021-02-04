import useSWR from "swr";
import type { TopicSchema } from "$server/models/topic";
import { api } from "./api";
import { revalidateTopic } from "./topic";

const key = "/api/v2/topics";

async function fetchTopics(_: typeof key, page = 0): Promise<TopicSchema[]> {
  const res = await api.apiV2TopicsGet({ page });
  const topics = (res["topics"] ?? []) as TopicSchema[];
  await Promise.all(topics.map((t) => revalidateTopic(t.id, t)));
  return topics;
}

const sharedOrCreatedBy = (
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) => (topic: TopicSchema) => topic.shared || isTopicEditable(topic);

export function useTopics(
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) {
  const { data } = useSWR<TopicSchema[]>(key, fetchTopics);
  return data?.filter(sharedOrCreatedBy(isTopicEditable));
}
