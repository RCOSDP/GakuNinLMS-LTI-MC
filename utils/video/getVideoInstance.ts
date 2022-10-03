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
  resource: Pick<
    VideoResourceSchema,
    "providerUrl" | "url" | "accessToken" | "tracks"
  >,
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
          // NOTE：ここに以下のようなURLを挿入するとトピック詳細などでOGPが作成される
          // poster: "https://wz.cccties.org/tmb/EZfWmlVrnweRfYn/10/20220920-1518-F2N6AO/vuca_1.jpg"
        }),
        tracks: buildTracks(resource.tracks),
        stopTimeOver: false,
      };
    }
  }
}

export default getVideoInstance;
