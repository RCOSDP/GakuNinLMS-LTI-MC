import { atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { VideoJsPlayer } from "video.js";
import type VimeoPlayer from "@vimeo/player";
import PlayerTracker from "$utils/eventLogger/playerTracker";

const playerTrackerAtom = atom<PlayerTracker | undefined>(undefined);
const playerTrackingAtom = atom<
  PlayerTracker | undefined,
  VideoJsPlayer | VimeoPlayer | undefined
>(
  (get) => get(playerTrackerAtom),
  (get, set, player) => {
    if (!player) return set(playerTrackerAtom, undefined);
    const prev = get(playerTrackerAtom);
    if (prev?.player === player) return;
    prev?.removeAllListeners();
    set(playerTrackerAtom, new PlayerTracker(player));
  }
);

export function usePlayerTrackingAtom() {
  useAtom(playerTrackerAtom);
  return useUpdateAtom(playerTrackingAtom);
}
