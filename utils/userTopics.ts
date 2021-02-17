import { useSWRInfinite } from "swr";
import type { UserSchema } from "$server/models/user";
import type { TopicSchema } from "$server/models/topic";
import { api } from "./api";
import useInfiniteProps from "./useInfiniteProps";

const key = "/api/v2/user/{user_id}/topics";

const makeKey = (userId: UserSchema["id"]) => (
  page: number,
  prev: TopicSchema[] | null
) => {
  if (prev && prev.length === 0) return null;
  return [key, userId, page];
};

async function fetchUserTopics(
  _: typeof key,
  userId: UserSchema["id"],
  page: number
) {
  const res = await api.apiV2UserUserIdTopicsGet({ userId, page });
  return res.topics as TopicSchema[];
}

export function useUserTopics(userId: UserSchema["id"]) {
  const { data, size, setSize } = useSWRInfinite<TopicSchema[]>(
    makeKey(userId),
    fetchUserTopics
  );
  const topics = data?.flatMap((topics) => topics) ?? [];
  return { topics, ...useInfiniteProps(data, size, setSize) };
}
