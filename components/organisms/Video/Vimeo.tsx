import { useEffect, useRef } from "react";
import Player, { Options } from "@vimeo/player";
import { usePlayerTrackingAtom } from "$store/playerTracker";
import volumePersister from "$utils/volumePersister";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  player: {
    "&:empty": {
      // NOTE: @vimeo/player によって iframe がぶら下がる前の高さを確保する
      paddingTop: "56.25%",
    },
  },
});

type VimeoProps = {
  options: Options;
};

const defaultOptions: Options = {
  responsive: true,
};

export function Vimeo({ options }: VimeoProps) {
  const ref = useRef(document.createElement("div"));
  const tracking = usePlayerTrackingAtom();
  const classes = useStyles();
  useEffect(() => {
    const element = document.createElement("div");
    element.classList.add(classes.player);
    ref.current.appendChild(element);
    const player = new Player(element, {
      ...defaultOptions,
      ...options,
    });
    tracking({ player, url: options.url });
    volumePersister(player);
    return () => {
      // TODO: 要素を取り除くと学習活動の記録のために使われている getPlayed() が resolve しないので残す
      //       メモリリークにつながるので避けたほうが望ましく、学習活動の送信後すみやかに取り除くべき
      player.pause();
      element.style.display = "none";
    };
  }, [options, tracking, classes]);
  return <div ref={ref} />;
}
