import { useEffect, useRef } from "react";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import type { VimeoInstance } from "$types/videoInstance";

const useStyles = makeStyles(
  createStyles({
    player: {
      "&:empty": {
        // NOTE: @vimeo/player によって iframe がぶら下がる前の高さを確保する
        paddingTop: "56.25%",
      },
    },
  })
);

type Props = Omit<VimeoInstance, "type" | "url">;

function Vimeo({ element, player }: Props) {
  const ref = useRef(document.createElement("div"));
  const classes = useStyles();
  useEffect(() => {
    const { current } = ref;
    element.classList.add(classes.player);
    current.appendChild(element);
    return () => {
      // TODO: 要素を取り除くと学習活動の記録のために使われている getPlayed() が resolve しないので残す
      //       メモリリークにつながるので避けたほうが望ましく、学習活動の送信後すみやかに取り除くべき
      void player.pause();
      element.classList.remove(classes.player);
      current.removeChild(element);
    };
  }, [element, player, classes]);
  return <div ref={ref} />;
}

export default Vimeo;
