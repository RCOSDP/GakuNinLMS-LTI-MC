import type VimeoPlayer from "@vimeo/player";
import type videojs from "video.js";
import type { VideoJsPlayer } from "video.js";

export type VideoJsInstance = {
  type: "youtube" | "wowza";
  element: HTMLElement;
  player: VideoJsPlayer;
  tracks?: videojs.TextTrackOptions[];
};

export type VimeoInstance = {
  type: "vimeo";
  element: HTMLDivElement;
  player: VimeoPlayer;
};

export type VideoInstance = VideoJsInstance | VimeoInstance;
