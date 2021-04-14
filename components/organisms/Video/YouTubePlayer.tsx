import { memo } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import buildTracks from "$utils/buildTracks";
import inIframe from "$utils/inIframe";
import { VideoJs } from "./VideoJs";

type PlayerProps = {
  url: string;
  tracks: VideoTrackSchema[];
  autoplay?: boolean;
};

const useStyles = makeStyles({
  vjsDisabledPlayButton: {
    "& .vjs-youtube .vjs-poster": {
      display: "none !important",
    },
    "& .vjs-youtube .vjs-loading-spinner": {
      display: "none !important",
    },
    "& .vjs-youtube .vjs-big-play-button": {
      display: "none !important",
    },
  },
});

function YouTubePlayerBase(props: PlayerProps) {
  const classes = useStyles();
  return (
    <VideoJs
      className={clsx({
        // NOTE: iframe 内で再生ボタンが機能しない場合が存在
        //  この問題を回避するために Video.js の再生ボタンではなく、YouTube IFrame Player の再生ボタンを表示
        //  see also https://github.com/npocccties/ChibiCHiLO/issues/373
        [classes.vjsDisabledPlayButton]: inIframe(),
      })}
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
