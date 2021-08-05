import { useMemo, useEffect } from "react";
import { VideoResourceSchema } from "$server/models/videoResource";
import VimeoPlayer from "@vimeo/player";
import Vimeo from "./Vimeo";
import VideoJs from "./VideoJs";
import getPlayer from "$utils/video/getPlayer";
import buildTracks from "$utils/buildTracks";

type Props = Pick<VideoResourceSchema, "providerUrl" | "url" | "tracks"> & {
  className?: string;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
  autoplay?: boolean;
};

export default function Video({
  providerUrl,
  url,
  tracks,
  className,
  onEnded,
  onDurationChange,
  autoplay = false,
}: Props) {
  const { element, player, videoTracks } = useMemo(() => {
    return {
      ...getPlayer({ providerUrl, url }, autoplay),
      videoTracks: buildTracks(tracks ?? []),
    };
  }, [providerUrl, url, autoplay, tracks]);
  useEffect(() => {
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
  }, [player, onEnded, onDurationChange]);

  return (
    <div className={className}>
      {player instanceof VimeoPlayer ? (
        <Vimeo element={element as HTMLDivElement} player={player} />
      ) : (
        <VideoJs element={element} player={player} tracks={videoTracks} />
      )}
    </div>
  );
}
