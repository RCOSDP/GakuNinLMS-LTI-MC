import { useSWRInfinite } from "swr";
import type { TopicSchema } from "$server/models/topic";
import { api } from "./api";
import useInfiniteProps from "./useInfiniteProps";
import { revalidateTopic } from "./topic";

const key = "/api/v2/topics";

function getKey(page: number, prev: TopicSchema[] | null) {
  if (prev && prev.length === 0) return null;
  return [key, page];
}

async function fetchTopics(
  _: typeof key,
  page: number
): Promise<TopicSchema[]> {
  const res = await api.apiV2TopicsGet({ page });
  const topics = (res["topics"] ?? []) as TopicSchema[];
  await Promise.all(topics.map((t) => revalidateTopic(t.id, t)));
  return topics;
}

function sharedOrCreatedBy(
  topic: TopicSchema,
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) {
  return topic.shared || isTopicEditable(topic);
}

const filter = (
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) => (topic: TopicSchema | undefined) => {
  if (topic === undefined) return [];
  if (!sharedOrCreatedBy(topic, isTopicEditable)) return [];
  return [topic];
};

export function useTopics(
  isTopicEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) {
  const { data, size, setSize } = useSWRInfinite<TopicSchema[]>(
    getKey,
    fetchTopics
  );
  const topics = data?.flat().flatMap(filter(isTopicEditable)) ?? [];
  return { topics, ...useInfiniteProps(data, size, setSize) };
}
