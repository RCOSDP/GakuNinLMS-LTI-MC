import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { RESET, atomWithReset, useUpdateAtom } from "jotai/utils";
import type { ResourceSchema } from "$server/models/resource";
import type { SectionSchema } from "$server/models/book/section";
import type { VideoInstance } from "$types/videoInstance";
import { isVideoResource } from "$utils/videoResource";
import getVideoInstance from "$utils/video/getVideoInstance";

const videoAtom = atomWithReset<{
  video: Map<ResourceSchema["url"], VideoInstance | undefined>;
  key: ResourceSchema["url"];
}>({
  video: new Map(),
  key: "",
});

const updateVideoAtom = atom(
  null,
  (get, set, sections: Pick<SectionSchema, "topics">[]) => {
    const { video, key } = get(videoAtom);
    const resources = sections.flatMap(({ topics }) =>
      topics.map(({ resource }) => resource)
    );
    for (const resource of resources) {
      video.set(
        resource.url,
        isVideoResource(resource) ? getVideoInstance(resource) : undefined
      );
    }
    set(videoAtom, { video, key });
  }
);

const updateVideoKeyAtom = atom(
  null,
  (get, set, key: ResourceSchema["url"]) => {
    set(videoAtom, { ...get(videoAtom), key });
  }
);

export function useVideoAtom() {
  const [state, reset] = useAtom(videoAtom);
  const updateVideo = useUpdateAtom(updateVideoAtom);
  const updateVideoKey = useUpdateAtom(updateVideoKeyAtom);
  useEffect(
    () => () => {
      reset(RESET);
    },
    [reset]
  );
  return { ...state, updateVideo, updateVideoKey };
}
