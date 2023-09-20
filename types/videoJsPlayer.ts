import type EventTarget from "video.js/dist/types/event-target";
import type Player from "video.js/dist/types/player";

// NOTE: `video.js` によって厳格な型が提供されていないので宣言
/** https://videojs.com/guides/text-tracks/ */
export type VideoJsTextTrackList = TextTrackList &
  Array<{
    kind: "subtitles";
    src: string;
    srclang: string;
    label: string;
    mode?: string;
    language?: string;
  }>;

// NOTE: `video.js` の提供している型とグローバルの宣言が衝突している/不足があるので自分で宣言している
//        see also https://github.com/videojs/video.js/issues/8109
export type VideoJsPlayer = Player &
  EventTarget & {
    /** https://docs.videojs.com/player#readyState */
    readyState(): 0 | 1 | 2 | 3 | 4;
    /** https://docs.videojs.com/player#remoteTextTracks */
    remoteTextTracks(): VideoJsTextTrackList;
    /** https://docs.videojs.com/player#seeking */
    seeking(): boolean;
    /** https://docs.videojs.com/player#src */
    src(): string;
  };
