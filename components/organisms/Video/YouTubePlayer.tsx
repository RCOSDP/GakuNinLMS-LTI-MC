import { memo } from "react";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import buildTracks from "$utils/buildTracks";
import { VideoJs } from "./VideoJs";

type PlayerProps = {
  url: string;
  tracks: VideoTrackSchema[];
  autoplay?: boolean;
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
    />
  );
}

export const YouTubePlayer = memo(YouTubePlayerBase);
