import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import type { VideoJsPlayer } from "$types/videoJsPlayer";
import type VimeoPlayer from "@vimeo/player";
import { PlayerTracker } from "$utils/eventLogger/playerTracker";

const playerTrackerAtom = atom<PlayerTracker | undefined>(undefined);
const playerTrackingAtom = atom<
  PlayerTracker | undefined,
  [{ url?: string; player: VideoJsPlayer | VimeoPlayer | undefined }],
  void
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
  return useSetAtom(playerTrackingAtom);
}
