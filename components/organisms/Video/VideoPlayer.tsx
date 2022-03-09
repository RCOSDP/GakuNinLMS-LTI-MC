import { useEffect } from "react";
import type { SxProps } from "@mui/system";
import type { VideoJsPlayer } from "video.js";
import type { Player } from "vimeo__player";
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
    const handleTimeUpdate = async () => {
      const currentTime = await getCurrentTime(videoInstance);
      onTimeUpdate?.(currentTime);
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

async function getCurrentTime(videoInstance: VideoInstance) {
  if (videoInstance.type == "vimeo")
    return await (videoInstance.player as Player).getCurrentTime();
  else return (videoInstance.player as VideoJsPlayer).currentTime();
}
