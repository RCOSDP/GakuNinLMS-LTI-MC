import type { VideoResourceSchema } from "$server/models/videoResource";
import type { VideoInstance } from "$types/videoInstance";
import buildTracks from "$utils/buildTracks";
import getVideoJsPlayer from "./getVideoJsPlayer";
import getVimeoPlayer from "./getVimeoPlayer";

/**
 * 動画プレイヤーのインスタンスを生成
 * @param resource VideoResourceSchema
 * @param autoplay インスタンス生成時に自動再生するか否か
 * @param thumbnailUrl wowzaのサムネイル作成用のurl
 * @returns プレイヤーのHTML要素、インスタンス、video.jsであれば字幕トラック
 */
function getVideoInstance(
  resource: Pick<
    VideoResourceSchema,
    "providerUrl" | "url" | "accessToken" | "tracks"
  >,
  autoplay = false,
  thumbnailUrl?: string
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
        stopTimeOver: false,
      };
    case "https://vimeo.com/":
      return {
        type: "vimeo",
        url: resource.url,
        ...getVimeoPlayer({ url: resource.url, autoplay }),
      };
    default: {
      const url = `${resource.url}?accessToken=${resource.accessToken}`;
      return {
        type: "wowza",
        url,
        ...getVideoJsPlayer({
          sources: [{ type: "application/vnd.apple.mpegurl", src: url }],
          autoplay,
          poster: thumbnailUrl,
        }),
        tracks: buildTracks(resource.tracks),
        stopTimeOver: false,
      };
    }
  }
}

export default getVideoInstance;
