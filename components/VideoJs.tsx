import React from "react";
import videojs from "video.js";
import "videojs-youtube";
import { useAppState, useAppPlayer } from "./state";

export function VideoJs(props: { options: videojs.PlayerOptions }) {
  const ref = React.useRef(document.createElement("div"));
  const setPlayer = useAppPlayer();
  React.useEffect(() => {
    const element = document.createElement("video-js");
    element.classList.add("vjs-big-play-centered");
    ref.current.appendChild(element);
    const player = videojs(element, props.options);
    setPlayer(player);
    return () => {
      setPlayer(undefined);
      player.dispose();
    };
  }, [props.options]);
  return <div ref={ref} />;
}

export function usePlayer(): videojs.Player | undefined {
  const player = useAppState().player;
  return player;
}
