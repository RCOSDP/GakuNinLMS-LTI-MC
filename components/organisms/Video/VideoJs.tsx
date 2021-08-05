import { useEffect, useRef } from "react";
import type videojs from "video.js";
import type { VideoJsPlayer } from "video.js";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import volumePersister from "$utils/volumePersister";

type Props = {
  element: HTMLElement;
  player: VideoJsPlayer;
  tracks?: videojs.TextTrackOptions[];
};

const useStyles = makeStyles(
  createStyles({
    // NOTE: Video.jsのエラーメッセージを読みやすくする目的
    vjsLargeText: {
      "& .vjs-modal-dialog-content": {
        fontSize: "1.5rem !important",
      },
    },
    // NOTE: iframe 内で再生ボタンが機能しない問題への対処と見た目の調整を図る目的
    //       See also https://github.com/npocccties/chibichilo/issues/373
    vjsDisabledPlayButton: {
      "&.vjs-youtube .vjs-poster": {
        display: "none !important",
      },
      "&.vjs-youtube .vjs-loading-spinner": {
        display: "none !important",
      },
      "&.vjs-youtube .vjs-big-play-button": {
        display: "none !important",
      },
    },
  })
);

function VideoJs({ element, player, tracks }: Props) {
  const ref = useRef(document.createElement("div"));
  const classes = useStyles();
  useEffect(() => {
    const { current } = ref;
    element.classList.add(
      "vjs-big-play-centered",
      classes.vjsLargeText,
      classes.vjsDisabledPlayButton
    );
    current.appendChild(element);
    player.ready(() => {
      volumePersister(player);
    });
    return () => {
      // TODO: played() に失敗するので dispose() せず一時停止して保持
      //       メモリリークにつながるので避けたほうが望ましい
      player.pause();
      element.classList.remove(
        "vjs-big-play-centered",
        classes.vjsLargeText,
        classes.vjsDisabledPlayButton
      );
      current.removeChild(element);
    };
  }, [element, player, classes]);
  const tracksRef = useRef<HTMLTrackElement[]>([]);
  useEffect(() => {
    if (!tracks || tracks.length === 0) return;
    player.ready(() => {
      tracksRef.current.forEach((track) => {
        player.removeRemoteTextTrack(track);
      });
      tracksRef.current = (tracks
        ?.map((track) => track && player.addRemoteTextTrack(track, false))
        .filter(Boolean) ?? []) as HTMLTrackElement[];
    });
  }, [player, tracks]);
  return <div ref={ref} />;
}

export default VideoJs;
