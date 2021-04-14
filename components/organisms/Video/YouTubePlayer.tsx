import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import buildTracks from "$utils/buildTracks";
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
      // NOTE: iframe 内で再生ボタンが機能しない問題への対処と見た目の調整を図る目的
      //       See also https://github.com/npocccties/ChibiCHiLO/issues/373
      className={classes.vjsDisabledPlayButton}
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
