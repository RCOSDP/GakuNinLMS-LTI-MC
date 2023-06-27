import { atom, useAtomValue, useSetAtom } from "jotai";
import type { SectionSchema } from "$server/models/book/section";
import type { VideoInstance } from "$types/videoInstance";
import { isVideoResource } from "$utils/videoResource";
import getVideoInstance from "$utils/video/getVideoInstance";

/** 動画プレイヤーオブジェクトプール (トピックID(10進数文字列)または動画URLをキーとして使用) */
const videoAtom = atom<{
  video: Map<string, VideoInstance>;
}>({
  video: new Map(),
});

const preloadVideoAtom = atom(
  null,
  (get, set, sections: Pick<SectionSchema, "topics">[]) => {
    const { video } = get(videoAtom);
    for (const topic of sections.flatMap(({ topics }) => topics)) {
      if (!isVideoResource(topic.resource)) {
        video.delete(String(topic.id));
        continue;
      }
      if (!video.has(String(topic.id))) {
        video.set(String(topic.id), getVideoInstance(topic.resource));
      }
    }
    set(videoAtom, { video });
  }
);

export function useVideoAtom() {
  const state = useAtomValue(videoAtom);
  const preloadVideo = useSetAtom(preloadVideoAtom);
  return { ...state, preloadVideo };
}
