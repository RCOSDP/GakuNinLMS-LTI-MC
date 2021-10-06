declare module "@meikidd/videojs-hlsjs-plugin/lib/videojs-hlsjs-plugin.js" {
  import type videojs from "video.js";
  type VideoJs = typeof videojs;
  export function registerConfigPlugin(videojs: VideoJs);
  export function registerSourceHandler(videojs: VideoJs);
}
