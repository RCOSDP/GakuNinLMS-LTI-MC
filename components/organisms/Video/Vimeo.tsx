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
    const { current } = ref;
    const player = new Player(current, {
      ...defaultOptions,
      ...props.options,
    });
    tracking(player);
    volumePersister(player);
    if (props.onEnded) player.on("ended", props.onEnded);
    return () => {
      player.destroy();
      // NOTE: destroy() してもゴミが残るので新しい空の要素にしておく
      current.textContent = "";
    };
  }, [props.options, props.onEnded, tracking]);
  return <div ref={ref} />;
}
