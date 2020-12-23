import { memo } from "react";
import { VideoJs } from "./VideoJs";
import buildTracks from "./buildTracks";
import { VideoTrackSchema } from "$server/models/videoTrack";

type PlayerProps = {
  url: string;
  tracks: VideoTrackSchema[];
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
      tracks={buildTracks(props.tracks)}
      onEnded={props.onEnded}
    />
  );
}

export const YouTubePlayer = memo(YouTubePlayerBase);
