import { useEffect, useRef } from "react";
import Player, { Options } from "@vimeo/player";
import { usePlayerTrackingAtom } from "$store/playerTracker";
import volumePersister from "$utils/volumePersister";

type VimeoProps = {
  options: Options;
  onEnded?: () => void;
};

const defaultOptions: Options = {
  responsive: true,
};

export function Vimeo(props: VimeoProps) {
  const ref = useRef(document.createElement("div"));
  const tracking = usePlayerTrackingAtom();
  useEffect(() => {
    const element = document.createElement("div");
    ref.current.appendChild(element);
    const player = new Player(element, {
      ...defaultOptions,
      ...props.options,
    });
    tracking(player);
    volumePersister(player);
    if (props.onEnded) player.on("ended", props.onEnded);
    return () => {
      // TODO: 要素を取り除くと学習活動の記録のために使われている getPlayed() が resolve しないので残す
      //       メモリリークにつながるので避けたほうが望ましく、学習活動の送信後すみやかに取り除くべき
      player.pause();
      element.style.display = "none";
    };
  }, [props.options, props.onEnded, tracking]);
  return <div ref={ref} />;
}
