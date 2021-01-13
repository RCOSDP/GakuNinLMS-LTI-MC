import { atom, useAtom } from "jotai";
import type { VideoTrackProps } from "$server/models/videoTrack";

const additionalVideoTracksAtom = atom<VideoTrackProps[]>([]);

const addVideoTrackAtom = atom<VideoTrackProps[], VideoTrackProps>(
  (get) => get(additionalVideoTracksAtom),
  (get, set, videoTrack) => {
    set(additionalVideoTracksAtom, [
      ...get(additionalVideoTracksAtom),
      videoTrack,
    ]);
  }
);

export function useAddVideoTrackAtom() {
  useAtom(additionalVideoTracksAtom);
  return useAtom(addVideoTrackAtom);
}
