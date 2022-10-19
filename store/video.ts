import { useUnmount } from "react-use";
import { atom, useAtom } from "jotai";
import { RESET, atomWithReset, useUpdateAtom } from "jotai/utils";
import type { SectionSchema } from "$server/models/book/section";
import type { VideoInstance } from "$types/videoInstance";
import { isVideoResource } from "$utils/videoResource";
import getVideoInstance from "$utils/video/getVideoInstance";

/** 動画プレイヤーオブジェクトプール (トピックID(10進数文字列)または動画URLをキーとして使用) */
const videoAtom = atomWithReset<{
  video: Map<string, VideoInstance>;
}>({
  video: new Map(),
});

const updateVideoAtom = atom(
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
  const updateVideo = useUpdateAtom(updateVideoAtom);
  useUnmount(() => {
    state.video.forEach(({ player }) => player.pause());
    reset(RESET);
  });
  return { ...state, updateVideo };
}
