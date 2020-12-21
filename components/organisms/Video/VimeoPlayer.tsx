import { memo } from "react";
import { Vimeo } from "./Vimeo";

type PlayerProps = {
  url: string;
  autoplay?: boolean;
  onEnded?: () => void;
};

function VimeoPlayerBase(props: PlayerProps) {
  return (
    <Vimeo
      options={{
        url: props.url,
        autoplay: props.autoplay,
      }}
      onEnded={props.onEnded}
    />
  );
}

export const VimeoPlayer = memo(VimeoPlayerBase);
