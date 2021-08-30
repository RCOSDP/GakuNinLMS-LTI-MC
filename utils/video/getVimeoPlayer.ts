import Player from "@vimeo/player";
import type { Options } from "@vimeo/player";
import getVideoHolder from "./getVideoHolder";

const defaultOptions: Options = {
  responsive: true,
};

function getVimeoPlayer(options: Options) {
  const element = document.createElement("div");
  getVideoHolder().appendChild(element);
  const player = new Player(element, { ...defaultOptions, ...options });
  return { element, player };
}

export default getVimeoPlayer;
