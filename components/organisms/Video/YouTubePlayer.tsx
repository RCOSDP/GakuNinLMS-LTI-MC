import { memo } from "react";
import { VideoJs } from "./VideoJs";
import { buildTracks } from "./subtitle";

type PlayerProps = {
  url: string;
  subtitles: Subtitle[];
  autoplay?: boolean;
  onEnded?: () => void;
};

function YouTubePlayerBase(props: PlayerProps) {
  return (
    <VideoJs
      options={{
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: props.url,
          },
        ],
        autoplay: props.autoplay,
      }}
      tracks={buildTracks(props.subtitles)}
      onEnded={props.onEnded}
    />
  );
}

export const YouTubePlayer = memo(YouTubePlayerBase);
