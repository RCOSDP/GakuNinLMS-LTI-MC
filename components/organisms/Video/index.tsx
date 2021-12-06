import { useMemo } from "react";
import type Box from "@mui/material/Box";
import type { VideoResourceSchema } from "$server/models/videoResource";
import VideoPlayer from "./VideoPlayer";
import getVideoInstance from "$utils/video/getVideoInstance";

type Props = Omit<Parameters<typeof Box>[0], "id"> &
  Pick<VideoResourceSchema, "providerUrl" | "url" | "tracks"> & {
    onEnded?: () => void;
    onDurationChange?: (duration: number) => void;
    autoplay?: boolean;
  };

export default function Video({
  providerUrl,
  url,
  tracks: resourceTracks,
  autoplay = false,
  ...other
}: Props) {
  const videoInstance = useMemo(() => {
    return getVideoInstance(
      { providerUrl, url, tracks: resourceTracks },
      autoplay
    );
  }, [providerUrl, url, autoplay, resourceTracks]);

  return <VideoPlayer videoInstance={videoInstance} {...other} />;
}
