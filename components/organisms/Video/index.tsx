import { useEffect } from "react";
import { VideoResourceSchema } from "$server/models/videoResource";
import { usePlayerTrackerAtom } from "$store/playerTracker";
import { YouTubePlayer } from "./YouTubePlayer";
import { VimeoPlayer } from "./VimeoPlayer";
import { HlsPlayer } from "./HlsPlayer";

type VideoProps = Pick<
  VideoResourceSchema,
  "providerUrl" | "url" | "tracks"
> & {
  className?: string;
  autoplay?: boolean;
  onEnded?: () => void;
  onDurationChange?: (duration: number) => void;
};

export default function Video(props: VideoProps) {
  const { className, onEnded, onDurationChange, ...other } = props;
  const playerTracker = usePlayerTrackerAtom();

  useEffect(() => {
    if (!playerTracker) return;
    const handleEnded = () => onEnded?.();
    const handleDurationChange = ({ duration }: { duration: number }) => {
      onDurationChange?.(duration);
    };
    playerTracker.on("ended", handleEnded);
    playerTracker.on("durationchange", handleDurationChange);
    return () => {
      playerTracker.off("ended", handleEnded);
      playerTracker.off("durationchange", handleDurationChange);
    };
  }, [playerTracker, onEnded, onDurationChange]);

  switch (props.providerUrl) {
    case "https://www.youtube.com/":
      return (
        <div className={className}>
          <YouTubePlayer {...other} />
        </div>
      );
    case "https://vimeo.com/":
      return (
        <div className={className}>
          <VimeoPlayer {...other} />
        </div>
      );
    default:
      return (
        <div className={className}>
          <HlsPlayer {...other} />
        </div>
      );
  }
}
