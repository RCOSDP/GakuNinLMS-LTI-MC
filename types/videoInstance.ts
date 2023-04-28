import type { VideoResourceSchema } from "$server/models/videoResource";
import type { VideoJsTextTrackList, VideoJsPlayer } from "$types/videoJsPlayer";
import type VimeoPlayer from "@vimeo/player";

export type VideoJsInstance = {
  type: "youtube" | "wowza";
  url: VideoResourceSchema["url"];
  element: HTMLElement;
  player: VideoJsPlayer;
  tracks?: VideoJsTextTrackList;
  stopTimeOver: boolean;
};

export type VimeoInstance = {
  type: "vimeo";
  url: VideoResourceSchema["url"];
  element: HTMLDivElement;
  player: VimeoPlayer;
};

export type VideoInstance = VideoJsInstance | VimeoInstance;
