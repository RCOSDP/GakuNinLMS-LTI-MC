import { useMemo, useEffect } from "react";
import { VideoResourceSchema } from "$server/models/videoResource";
import Vimeo from "./Vimeo";
import VideoJs from "./VideoJs";
import getVideoInstance from "$utils/video/getVideoInstance";

type Props = Pick<VideoResourceSchema, "providerUrl" | "url" | "tracks"> & {
  className?: string;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
  autoplay?: boolean;
};

export default function Video({
  providerUrl,
  url,
  tracks: resourceTracks,
  className,
  onEnded,
  onDurationChange,
  autoplay = false,
}: Props) {
  const videoInstance = useMemo(() => {
    return getVideoInstance(
      { providerUrl, url, tracks: resourceTracks },
      autoplay
    );
  }, [providerUrl, url, autoplay, resourceTracks]);
  useEffect(() => {
    const { player } = videoInstance;
    const handleEnded = () => onEnded?.();
    const handleDurationChange = ({ duration }: { duration: number }) => {
      onDurationChange?.(duration);
    };
    player.on("ended", handleEnded);
    player.on("durationchange", handleDurationChange);
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
