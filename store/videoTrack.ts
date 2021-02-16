import { atom } from "jotai";
import {
  atomWithReset,
  useResetAtom,
  useAtomValue,
  useUpdateAtom,
} from "jotai/utils";
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
  const videoTracksProps = useAtomValue(videoTracksPropsAtom);
  const resetVideoTrackProps = useResetAtom(videoTracksPropsAtom);
  const videoTracks = useAtomValue(videoTracksAtom);
  const setVideoTracks = useUpdateAtom(videoTracksSchemaAtom);
  const addVideoTrack = useUpdateAtom(addVideoTrackAtom);
  const deleteVideoTrack = useUpdateAtom(deleteVideoTrackAtom);
  return {
    videoTracksProps,
    resetVideoTrackProps,
    videoTracks,
    setVideoTracks,
    addVideoTrack,
    deleteVideoTrack,
  };
}
