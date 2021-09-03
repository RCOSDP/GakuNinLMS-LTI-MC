import { useEffect, useMemo } from "react";
import throttle from "lodash.throttle";
import usePrevious from "@rooks/use-previous";
import type { TopicSchema } from "$server/models/topic";
import { useSessionAtom } from "$store/session";
import { useBookAtom } from "$store/book";
import { usePlayerTrackerAtom } from "$store/playerTracker";
import type { PlayerTracker } from "./eventLogger/playerTracker";
import { api } from "./api";
import { NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL } from "./env";

const secToMs = (sec: number) => Math.floor(sec * 1000);

const buildUpdateHandler =
  (topicId: TopicSchema["id"], playerTracker: PlayerTracker) => async () => {
    const timeRanges = await playerTracker.getPlayed();
    const body = {
      timeRanges: timeRanges.map(([low, high]) => ({
        startMs: secToMs(low),
        endMs: secToMs(high),
      })),
    };
    await api.apiV2TopicTopicIdActivityPut({ topicId, body });
  };

/** 学習活動のトラッキングの開始 (要: useBook()) */
export function useActivityTracking() {
  const { isInstructor } = useSessionAtom();
  const { itemIndex, itemExists } = useBookAtom();
  const topic = itemExists(itemIndex);
  const playerTracker = usePlayerTrackerAtom();
  const unchanged = playerTracker === usePrevious(playerTracker);
  const updateHandler = useMemo(() => {
    if (isInstructor) return;
    if (unchanged) return;
    return (
      topic && playerTracker && buildUpdateHandler(topic.id, playerTracker)
    );
  }, [isInstructor, unchanged, topic, playerTracker]);
  const throttled = useMemo(
    () =>
      updateHandler &&
      throttle(updateHandler, NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL * 1000),
    [updateHandler]
  );
  useEffect(() => {
    if (throttled) playerTracker?.on("timeupdate", throttled);
  }, [playerTracker, throttled]);
}
