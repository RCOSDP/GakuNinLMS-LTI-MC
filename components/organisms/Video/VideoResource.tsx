import { useMemo, useEffect } from "react";
import type { SxProps } from "@mui/system";
import type { VideoResourceSchema } from "$server/models/videoResource";
import VideoPlayer from "./VideoPlayer";
import getVideoInstance from "$utils/video/getVideoInstance";
import { useVideoAtom } from "$store/video";

type Props = Pick<VideoResourceSchema, "providerUrl" | "url" | "tracks"> & {
  sx?: SxProps;
  className?: string;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
  topicId: number;
  autoplay?: boolean;
};

export default function VideoResource({
  providerUrl,
  url,
  tracks: resourceTracks,
  topicId,
  autoplay = false,
  ...other
}: Props) {
  const videoInstance = useMemo(() => {
    return getVideoInstance(
      { providerUrl, url, tracks: resourceTracks },
      autoplay
    );
  }, [providerUrl, url, autoplay, resourceTracks]);

  const { video } = useVideoAtom();
  useEffect(() => {
    video.set(String(topicId), videoInstance);
    return () => video.clear();
  }, [video, topicId, videoInstance]);

  return <VideoPlayer videoInstance={videoInstance} {...other} />;
}
