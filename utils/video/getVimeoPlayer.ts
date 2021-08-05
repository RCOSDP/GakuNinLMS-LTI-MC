import Player from "@vimeo/player";
import type { Options } from "@vimeo/player";

const defaultOptions: Options = {
  responsive: true,
};

function getVimeoPlayer(options: Options) {
  const element = document.createElement("div");
  const player = new Player(element, { ...defaultOptions, ...options });
  return { element, player };
}

export default getVimeoPlayer;
