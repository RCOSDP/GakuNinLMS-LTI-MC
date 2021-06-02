import { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import ja from "video.js/dist/lang/ja.json";
import "videojs-youtube";
import "videojs-seek-buttons";
import "@videojs/http-streaming";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { usePlayerTrackingAtom } from "$store/playerTracker";
import volumePersister from "$utils/volumePersister";

type VideoJsProps = {
  className?: string;
  options: VideoJsPlayerOptions;
  tracks?: videojs.TextTrackOptions[];
};

const useStyles = makeStyles({
  vjsLargeText: {
    "& .vjs-modal-dialog-content": {
      fontSize: "1.5rem !important",
    },
  },
});

const defaultOptions: VideoJsPlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    // FIXME: https://github.com/videojs/videojs-youtube/issues/562
    pictureInPictureToggle: false,
  },
  playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  language: "ja",
  languages: { ja },
};

export function VideoJs({ className, options, tracks }: VideoJsProps) {
  const ref = useRef(document.createElement("div"));
  const tracking = usePlayerTrackingAtom();
  const classes = useStyles();
  useEffect(() => {
    const { current } = ref;
    const element = document.createElement("video-js");
    element.classList.add("vjs-big-play-centered");
    current.appendChild(element);
    const player = videojs(element, { ...defaultOptions, ...options });
    // @ts-expect-error: @types/video.js@^7.3.11 Unsupported
    player.seekButtons({
      forward: 15,
      back: 15,
    });
    player.ready(() => {
      tracking({ player });
      volumePersister(player);
    });
    return () => {
      // TODO: played() に失敗するので dispose() せず一時停止して保持
      //       メモリリークにつながるので避けたほうが望ましい
      player.pause();
      current.textContent = "";
    };
  }, [options, tracking]);
  const tracksRef = useRef<HTMLTrackElement[]>([]);
  useEffect(() => {
    if (!tracks || tracks.length === 0) return;
    const player: VideoJsPlayer | undefined = ref.current.querySelector(
      "video-js"
      // @ts-expect-error: @types/video.js@^7.3.11 Unsupported
    )?.player;
    if (!player) return;
    player.ready(() => {
      tracksRef.current.forEach((track) => {
        player.removeRemoteTextTrack(track);
      });
      tracksRef.current = (tracks
        ?.map((track) => track && player.addRemoteTextTrack(track, false))
        .filter(Boolean) ?? []) as HTMLTrackElement[];
    });
  }, [tracks]);
  return (
    <div
      className={clsx(
        className,
        classes.vjsLargeText // NOTE: Video.jsのエラーメッセージを読みやすくする目的
      )}
      ref={ref}
    />
  );
}
