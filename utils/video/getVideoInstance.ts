import type { VideoResourceSchema } from "$server/models/videoResource";
import type { VideoInstance } from "$types/videoInstance";
import buildTracks from "$utils/buildTracks";
import getVideoJsPlayer from "./getVideoJsPlayer";
import getVimeoPlayer from "./getVimeoPlayer";

/**
 * 動画プレイヤーのインスタンスを生成
 * @param resource VideoResourceSchema
 * @param autoplay インスタンス生成時に自動再生するか否か
 * @returns プレイヤーのHTML要素、インスタンス、video.jsであれば字幕トラック
 */
function getVideoInstance(
  resource: Pick<VideoResourceSchema, "providerUrl" | "url" | "tracks">,
  autoplay = false
): VideoInstance {
  switch (resource.providerUrl) {
    case "https://www.youtube.com/":
      return {
        type: "youtube",
        url: resource.url,
        ...getVideoJsPlayer({
          techOrder: ["youtube"],
          sources: [
            {
              type: "video/youtube",
              src: resource.url,
            },
          ],
          autoplay,
        }),
        tracks: buildTracks(resource.tracks),
      };
    case "https://vimeo.com/":
      return {
        type: "vimeo",
        url: resource.url,
        ...getVimeoPlayer({ url: resource.url, autoplay }),
      };
    default:
      return {
        type: "wowza",
        url: resource.url,
        ...getVideoJsPlayer({
          sources: [
            { type: "application/vnd.apple.mpegurl", src: resource.url },
          ],
          autoplay,
        }),
        tracks: buildTracks(resource.tracks),
      };
  }
}

export default getVideoInstance;
