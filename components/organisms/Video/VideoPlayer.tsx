import { useEffect } from "react";
import type { SxProps } from "@mui/system";
import type { VideoInstance } from "$types/videoInstance";
import Box from "@mui/material/Box";
import useVolume from "$utils/useVolume";
import { usePlaybackRate } from "$utils/playbackRate";
import Vimeo from "./Vimeo";
import VideoJs from "./VideoJs";
import videoJsDurationChangeShims from "$utils/videoJsDurationChangeShims";

type Props = {
  sx?: SxProps;
  className?: string;
  videoInstance: VideoInstance;
  autoplay?: boolean;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
};

export default function VideoPlayer({
  videoInstance,
  autoplay = false,
  onEnded,
  onDurationChange,
  onTimeUpdate,
  ...other
}: Props) {
  useVolume(videoInstance.player);
  usePlaybackRate(videoInstance.player);
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
    if (videoInstance.type !== "vimeo") {
      videoJsDurationChangeShims(videoInstance.player, handleDurationChange);
    }
    if (autoplay) {
      const play = async () => {
        try {
          await player.play();
        } catch {
          // nop
        }
      };
      if (videoInstance.type === "vimeo") {
        void videoInstance.player.ready().then(play);
      } else {
        void videoInstance.player.ready(play);
      }
    }
    return () => {
      player.off("ended", handleEnded);
      player.off("durationchange", handleDurationChange);
      player.off("timeupdate", handleTimeUpdate);
    };
  }, [videoInstance, autoplay, onEnded, onDurationChange, onTimeUpdate]);

  return (
    <Box {...other}>
      {videoInstance.type === "vimeo" && <Vimeo {...videoInstance} />}
      {videoInstance.type === "youtube" && <VideoJs {...videoInstance} />}
      {videoInstance.type === "wowza" && <VideoJs {...videoInstance} />}
    </Box>
  );
}
