import { atom, useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { VideoJsPlayer } from "video.js";
import type VimeoPlayer from "@vimeo/player";
import { PlayerTracker } from "$utils/eventLogger/playerTracker";

const playerTrackerAtom = atom<PlayerTracker | undefined>(undefined);
const playerTrackingAtom = atom<
  PlayerTracker | undefined,
  { url?: string; player: VideoJsPlayer | VimeoPlayer | undefined }
>(
  (get) => get(playerTrackerAtom),
  (get, set, { player, url }) => {
    const prev = get(playerTrackerAtom);
    if (prev?.player === player) return;
    prev?.removeAllListeners();
    set(playerTrackerAtom, player && new PlayerTracker(player, url));
  }
);

export function usePlayerTrackerAtom() {
  return useAtomValue(playerTrackerAtom);
}

export function usePlayerTrackingAtom() {
  useAtom(playerTrackerAtom);
  return useUpdateAtom(playerTrackingAtom);
}
