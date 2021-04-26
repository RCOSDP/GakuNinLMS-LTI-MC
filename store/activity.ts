import { useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { ActivitySchema } from "$server/models/activity";
import { TopicSchema } from "$server/models/topic";

type ActivityState = Map<TopicSchema["id"], ActivitySchema>;

const activityAtom = atom<ActivityState>(new Map());

export function useActivityAtom(activity?: Array<ActivitySchema>) {
  const [state, set] = useAtom(activityAtom);
  const isCompleted = useCallback(
    (topicId: TopicSchema["id"]) => state.get(topicId)?.completed,
    [state]
  );

  useEffect(() => {
    if (activity) set(() => new Map(activity.map((a) => [a.topic.id, a])));
  }, [set, activity]);

  return { isCompleted };
}
