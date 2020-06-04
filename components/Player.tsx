import React from "react";
import { VideoJs } from "./VideoJs";

export function Player(props: { youtubeVideoId: string }) {
  const options = React.useMemo(
    () => ({
      techOrder: ["youtube"],
      sources: [
        {
          type: "video/youtube",
          src: `watch?v=${props.youtubeVideoId}`,
        },
      ],
      controls: true,
      fluid: true,
    }),
    [props.youtubeVideoId]
  );
  return <VideoJs options={options} />;
}
