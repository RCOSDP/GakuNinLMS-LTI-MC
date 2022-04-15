import { useEffect } from "react";
import type { SxProps } from "@mui/system";
import type { VideoInstance } from "$types/videoInstance";
import Box from "@mui/material/Box";
import useVolume from "$utils/useVolume";
import Vimeo from "./Vimeo";
import VideoJs from "./VideoJs";
import videoJsDurationChangeShims from "$utils/videoJsDurationChangeShims";

type Props = {
  sx?: SxProps;
  className?: string;
  videoInstance: VideoInstance;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
};

export default function VideoPlayer({
  videoInstance,
  onEnded,
  onDurationChange,
  onTimeUpdate,
  ...other
}: Props) {
  useVolume(videoInstance.player);
  useEffect(() => {
    const { player } = videoInstance;
    const handleEnded = () => onEnded?.();
    const handleDurationChange = ({ duration }: { duration: number }) => {
      onDurationChange?.(duration);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTimeUpdate = (event: any) => {
      const currentTime =
        event?.seconds || event?.target?.player?.currentTime?.();
      if (Number.isFinite(currentTime)) onTimeUpdate?.(currentTime);
    };

    player.on("ended", handleEnded);
    player.on("durationchange", handleDurationChange);
    player.on("timeupdate", handleTimeUpdate);
    if (videoInstance.type != "vimeo") {
      videoJsDurationChangeShims(videoInstance.player, handleDurationChange);
    }
    return () => {
      player.off("ended", handleEnded);
      player.off("durationchange", handleDurationChange);
      player.off("timeupdate", handleTimeUpdate);
    };
  }, [videoInstance, onEnded, onDurationChange, onTimeUpdate]);

  return (
    <Box {...other}>
      {videoInstance.type === "vimeo" && <Vimeo {...videoInstance} />}
      {videoInstance.type === "youtube" && <VideoJs {...videoInstance} />}
      {videoInstance.type === "wowza" && <VideoJs {...videoInstance} />}
    </Box>
  );
}
