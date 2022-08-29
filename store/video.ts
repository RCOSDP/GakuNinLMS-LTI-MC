import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import type { SectionSchema } from "$server/models/book/section";
import type { VideoInstance } from "$types/videoInstance";
import { isVideoResource } from "$utils/videoResource";
import getVideoInstance from "$utils/video/getVideoInstance";

const videoAtom = atomWithReset<{
  video: Map<string, VideoInstance>;
}>({
  video: new Map(),
});

export const updateVideoAtom = atom(
  null,
  (get, set, sections: Pick<SectionSchema, "topics">[]) => {
    const { video } = get(videoAtom);
    for (const topic of sections.flatMap(({ topics }) => topics)) {
      if (!isVideoResource(topic.resource)) {
        video.delete(String(topic.id));
        continue;
      }
      video.set(String(topic.id), getVideoInstance(topic.resource));
    }
    set(videoAtom, { video });
  }
);

export function useVideoAtom() {
  const [state, reset] = useAtom(videoAtom);
  useEffect(
    () => () => {
      reset(RESET);
    },
    [reset]
  );
  return state;
}
