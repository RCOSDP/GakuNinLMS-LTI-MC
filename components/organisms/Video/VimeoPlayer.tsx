import { memo } from "react";
import { Vimeo } from "./Vimeo";

type PlayerProps = {
  url: string;
  autoplay?: boolean;
};

function VimeoPlayerBase(props: PlayerProps) {
  return (
    <Vimeo
      options={{
        url: props.url,
        // NOTE: boolean に割り当てなければ自動再生されうる
        autoplay: Boolean(props.autoplay),
      }}
    />
  );
}

export const VimeoPlayer = memo(VimeoPlayerBase);
