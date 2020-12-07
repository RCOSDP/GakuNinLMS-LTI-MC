import { YouTubePlayer } from "./YouTubePlayer";
import { VimeoPlayer } from "./VimeoPlayer";
import { WowzaPlayer } from "./WowzaPlayer";

type VideoProps = VideoLocation & {
  subtitles: Subtitle[];
  autoplay?: boolean;
  onEnded?: () => void;
};

export default function Video(props: VideoProps) {
  switch (props.type) {
    case "youtube":
      return <YouTubePlayer {...props} />;
    case "vimeo":
      return <VimeoPlayer {...props} />;
    case "wowza":
    default:
      return <WowzaPlayer {...props} />;
  }
}
