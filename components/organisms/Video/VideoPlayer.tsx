import { useEffect } from "react";
import type { VideoInstance } from "$types/videoInstance";
import Vimeo from "./Vimeo";
import VideoJs from "./VideoJs";
import videoJsDurationChangeShims from "$utils/videoJsDurationChangeShims";

type Props = {
  videoInstance: VideoInstance;
  className?: string;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
};

export default function VideoPlayer({
  videoInstance,
  className,
  onEnded,
  onDurationChange,
}: Props) {
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
    <div className={className}>
      {videoInstance.type === "vimeo" && <Vimeo {...videoInstance} />}
      {videoInstance.type === "youtube" && <VideoJs {...videoInstance} />}
      {videoInstance.type === "wowza" && <VideoJs {...videoInstance} />}
    </div>
  );
}
