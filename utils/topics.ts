import useSWR from "swr";
import type { TopicSchema } from "$server/models/topic";
import type { UserSchema } from "$server/models/user";
import { api } from "./api";
import { revalidateTopic } from "./topic";
import topicCreateBy from "./topicCreateBy";

const key = "/api/v2/topics";

async function fetchTopics(_: typeof key, page = 0): Promise<TopicSchema[]> {
  const res = await api.apiV2TopicsGet({ page });
  const topics = (res["topics"] ?? []) as TopicSchema[];
  await Promise.all(topics.map((t) => revalidateTopic(t.id, t)));
  return topics;
}

const sharedOrCreatedBy = (creator?: Pick<UserSchema, "id">) => (
  topic: TopicSchema
) => topic.shared || topicCreateBy(topic, creator);

export function useTopics(creator: Pick<UserSchema, "id"> | undefined) {
  const { data } = useSWR<TopicSchema[]>(key, fetchTopics);
  return data?.filter(sharedOrCreatedBy(creator));
}
