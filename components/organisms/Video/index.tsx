import { YouTubePlayer } from "./YouTubePlayer";
import { VimeoPlayer } from "./VimeoPlayer";
import { WowzaPlayer } from "./WowzaPlayer";

type VideoProps = VideoLocation & {
  className?: string;
  subtitles: Subtitle[];
  autoplay?: boolean;
  onEnded?: () => void;
};

export default function Video(props: VideoProps) {
  const { className, ...other } = props;
  switch (props.type) {
    case "youtube":
      return (
        <div className={className}>
          <YouTubePlayer {...other} />
        </div>
      );
    case "vimeo":
      return (
        <div className={className}>
          <VimeoPlayer {...other} />
        </div>
      );
    case "wowza":
    default:
      return (
        <div className={className}>
          <WowzaPlayer {...other} />
        </div>
      );
  }
}
