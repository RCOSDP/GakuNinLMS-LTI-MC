import { useEffect } from "react";
import type { VideoInstance } from "$types/videoInstance";
import Box from "@mui/material/Box";
import useVolume from "$utils/useVolume";
import Vimeo from "./Vimeo";
import VideoJs from "./VideoJs";
import videoJsDurationChangeShims from "$utils/videoJsDurationChangeShims";

type Props = Parameters<typeof Box>[0] & {
  videoInstance: VideoInstance;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
};

export default function VideoPlayer({
  videoInstance,
  onEnded,
  onDurationChange,
  ...other
}: Props) {
  useVolume(videoInstance.player);
  useEffect(() => {
    const { player } = videoInstance;
    const handleEnded = () => onEnded?.();
    const handleDurationChange = ({ duration }: { duration: number }) => {
      onDurationChange?.(duration);
    };

    player.on("ended", handleEnded);
    player.on("durationchange", handleDurationChange);
    if (videoInstance.type != "vimeo") {
      videoJsDurationChangeShims(videoInstance.player, handleDurationChange);
    }
    return () => {
      player.off("ended", handleEnded);
      player.off("durationchange", handleDurationChange);
    };
  }, [videoInstance, onEnded, onDurationChange]);

  return (
    <Box {...other}>
      {videoInstance.type === "vimeo" && <Vimeo {...videoInstance} />}
      {videoInstance.type === "youtube" && <VideoJs {...videoInstance} />}
      {videoInstance.type === "wowza" && <VideoJs {...videoInstance} />}
    </Box>
  );
}
