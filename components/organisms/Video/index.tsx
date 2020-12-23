import { VideoResourceSchema } from "$server/models/videoResource";
import { YouTubePlayer } from "./YouTubePlayer";
import { VimeoPlayer } from "./VimeoPlayer";
import { WowzaPlayer } from "./WowzaPlayer";

type VideoProps = Pick<
  VideoResourceSchema,
  "providerUrl" | "url" | "tracks"
> & {
  className?: string;
  autoplay?: boolean;
  onEnded?: () => void;
};

export default function Video(props: VideoProps) {
  const { className, ...other } = props;
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
          <WowzaPlayer {...other} />
        </div>
      );
  }
}
