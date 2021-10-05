import { useMemo } from "react";
import { useSWRInfinite } from "swr";
import type { TopicSchema } from "$server/models/topic";
import type { UserSchema } from "$server/models/user";
import type { Filter } from "$types/filter";
import { useSessionAtom } from "$store/session";
import { useSearchAtom } from "$store/search";
import useSortOrder from "./useSortOrder";
import useInfiniteProps from "./useInfiniteProps";
import useFilter from "./useFilter";
import topicSearch from "./search/topicSearch";
import contentCreateBy from "./contentCreateBy";
import { makeUserTopicsKey, fetchUserTopics } from "./userTopics";
import { makeTopicsKey, fetchTopics } from "./topics";

function sharedOrCreatedBy(
  topic: TopicSchema,
  isContentEditable: (content: Pick<TopicSchema, "creator">) => boolean
) {
  return topic.shared || isContentEditable(topic);
}

const makeFilter = (
  filter: Filter,
  userId: UserSchema["id"],
  isContentEditable: (topic: Pick<TopicSchema, "creator">) => boolean
) => (topic: TopicSchema | undefined) => {
  if (topic === undefined) return [];
  const isMyTopic = contentCreateBy(topic, { id: userId ?? NaN });
  if (filter === "other" && isMyTopic) return [];
  if (!sharedOrCreatedBy(topic, isContentEditable)) return [];
  return [topic];
};

function useTopics() {
  const { session, isContentEditable } = useSessionAtom();
  const { query } = useSearchAtom();
  const [sort, onSortChange] = useSortOrder();
  const [filter, onFilterChange] = useFilter();
  const userId = session?.user.id ?? NaN;
  const isUserTopics = filter === "self";
  const { key, fetch } = useMemo(
    () =>
      isUserTopics
        ? { key: makeUserTopicsKey(userId, sort, 20), fetch: fetchUserTopics }
        : { key: makeTopicsKey(sort, 20), fetch: fetchTopics },
    [isUserTopics, userId, sort]
  );
  const topicFilter = useMemo(
    () => makeFilter(filter, userId, isContentEditable),
    [filter, userId, isContentEditable]
  );
  const res = useSWRInfinite<TopicSchema[]>(key, fetch);
  const topics = topicSearch(
    res.data?.flat().flatMap(topicFilter) ?? [],
    query
  );
  return {
    topics,
    onSortChange,
    onFilterChange,
    ...useInfiniteProps(res),
  };
}

export default useTopics;
