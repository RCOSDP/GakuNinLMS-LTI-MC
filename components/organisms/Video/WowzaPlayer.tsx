import { memo } from "react";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import buildTracks from "$utils/buildTracks";
import { VideoJs } from "./VideoJs";

type PlayerProps = {
  url: string;
  tracks: VideoTrackSchema[];
  autoplay?: boolean;
  onEnded?: () => void;
};

/** @todo 未実装 */
function useWowzaResource(url: string) {
  return {
    type: "application/vnd.apple.mpegurl",
    src: url,
  };
}

function WowzaPlayerBase(props: PlayerProps) {
  const resource = useWowzaResource(props.url);

  return (
    <VideoJs
      options={{
        sources: [resource],
        autoplay: props.autoplay,
      }}
      tracks={buildTracks(props.tracks)}
      onEnded={props.onEnded}
    />
  );
}

export const WowzaPlayer = memo(WowzaPlayerBase);
