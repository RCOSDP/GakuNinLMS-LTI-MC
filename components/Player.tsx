import React from "react";
import ISO6391 from "iso-639-1";
import { VideoJs } from "./VideoJs";
import { Subtitle } from "./video/subtitle";

export function Player(props: {
  youtubeVideoId: string;
  subtitles: Subtitle[];
}) {
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
  const tracks = React.useMemo(() => props.subtitles.map(track), [
    props.subtitles,
  ]);
  return <VideoJs options={options} tracks={tracks} />;
}

function track(
  subtitle: Subtitle
): { kind: "subtitles"; src: string; srclang: string; label: string } {
  let src;
  if (subtitle.file.size === 0)
    src = `${process.env.NEXT_PUBLIC_SUBTITLE_STORE_PATH}/${subtitle.file.name}`;
  else src = URL.createObjectURL(subtitle.file);
  return {
    kind: "subtitles",
    src,
    srclang: subtitle.lang,
    label: ISO6391.getNativeName(subtitle.lang),
  };
}
