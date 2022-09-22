import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { RESET, atomWithReset, useAtomValue, useUpdateAtom } from "jotai/utils";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";

const toVideoTrackSchema = (
  { language, content }: VideoTrackProps,
  index: number
): VideoTrackSchema => ({
  // NOTE: uploadVideoTrackでidを採番する前はindexをマッピングする
  id: index,
  kind: "subtitles",
  language,
  url: URL.createObjectURL(new Blob([content])),
  accessToken: "",
});

const isVideoTrackProps = (
  videoTrack: VideoTrackProps | VideoTrackSchema
): videoTrack is VideoTrackProps => "content" in videoTrack;

const videoTracksPropsAtom = atomWithReset<VideoTrackProps[]>([]);
const videoTracksSchemaAtom = atom<VideoTrackSchema[]>([]);

const videoTracksAtom = atom<VideoTrackSchema[]>((get) => {
  if (get(videoTracksPropsAtom).length > 0)
    return get(videoTracksPropsAtom).map(toVideoTrackSchema);
  else return get(videoTracksSchemaAtom);
});

const addVideoTrackAtom = atom<null, VideoTrackProps | VideoTrackSchema>(
  null,
  (get, set, videoTrack) => {
    if (isVideoTrackProps(videoTrack)) {
      set(videoTracksPropsAtom, [...get(videoTracksPropsAtom), videoTrack]);
    } else {
      set(videoTracksSchemaAtom, [...get(videoTracksSchemaAtom), videoTrack]);
    }
  }
);

const deleteVideoTrackAtom = atom<null, VideoTrackSchema["id"]>(
  null,
  (get, set, indexOrId) => {
    const videoTracksProps = get(videoTracksPropsAtom);
    if (videoTracksProps.length > 0) {
      set(
        videoTracksPropsAtom,
        videoTracksProps.filter((_, index) => index !== indexOrId)
      );
    } else {
      set(
        videoTracksSchemaAtom,
        get(videoTracksSchemaAtom).filter(
          (videoTrack) => videoTrack.id !== indexOrId
        )
      );
    }
  }
);

export function useVideoTrackAtom() {
  const [videoTracksProps, reset] = useAtom(videoTracksPropsAtom);
  const videoTracks = useAtomValue(videoTracksAtom);
  const setVideoTracks = useUpdateAtom(videoTracksSchemaAtom);
  const addVideoTrack = useUpdateAtom(addVideoTrackAtom);
  const deleteVideoTrack = useUpdateAtom(deleteVideoTrackAtom);
  useEffect(
    () => () => {
      reset(RESET);
    },
    [reset]
  );
  return {
    videoTracksProps,
    videoTracks,
    setVideoTracks,
    addVideoTrack,
    deleteVideoTrack,
  };
}
