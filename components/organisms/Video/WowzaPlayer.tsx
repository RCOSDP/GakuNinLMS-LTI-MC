import { memo } from "react";
import { VideoTrackSchema } from "$server/models/videoTrack";
import { VideoJs } from "./VideoJs";
import { useWowzaResource } from "./wowza";
import buildTracks from "./buildTracks";

type PlayerProps = {
  url: string;
  tracks: VideoTrackSchema[];
  autoplay?: boolean;
  onEnded?: () => void;
};

function WowzaPlayerBase(props: PlayerProps) {
  const resource = useWowzaResource(props.url);
  const sources =
    resource.state === "success"
      ? [
          {
            type: "application/vnd.apple.mpegurl",
            src: resource.url,
          },
        ]
      : [];

  return (
    <VideoJs
      options={{
        sources,
        autoplay: props.autoplay,
      }}
      tracks={buildTracks(props.tracks)}
      onEnded={props.onEnded}
    />
  );
}

export const WowzaPlayer = memo(WowzaPlayerBase);
