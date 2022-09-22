import type { VideoResourceSchema } from "$server/models/videoResource";
import type VimeoPlayer from "@vimeo/player";
import type videojs from "video.js";
import type { VideoJsPlayer } from "video.js";

export type VideoJsInstance = {
  type: "youtube" | "wowza";
  url: VideoResourceSchema["url"];
  element: HTMLElement;
  player: VideoJsPlayer;
  tracks?: videojs.TextTrackOptions[];
  stopTimeOver: boolean;
};

export type VimeoInstance = {
  type: "vimeo";
  url: VideoResourceSchema["url"];
  element: HTMLDivElement;
  player: VimeoPlayer;
};

export type VideoInstance = VideoJsInstance | VimeoInstance;
