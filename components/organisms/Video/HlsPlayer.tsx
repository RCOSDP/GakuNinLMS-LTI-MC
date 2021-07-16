import { memo } from "react";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import buildTracks from "$utils/buildTracks";
import { VideoJs } from "./VideoJs";

type PlayerProps = {
  url: string;
  tracks: VideoTrackSchema[];
  autoplay?: boolean;
};

function HlsPlayerBase(props: PlayerProps) {
  return (
    <VideoJs
      options={{
        sources: [
          {
            type: "application/vnd.apple.mpegurl",
            src: props.url,
          },
        ],
        autoplay: props.autoplay,
      }}
      tracks={buildTracks(props.tracks)}
    />
  );
}

export const HlsPlayer = memo(HlsPlayerBase);
