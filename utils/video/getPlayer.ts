import type { VideoResourceSchema } from "$server/models/videoResource";
import getVideoJsPlayer from "./getVideoJsPlayer";
import getVimeoPlayer from "./getVimeoPlayer";

function getPlayer(
  resource: Pick<VideoResourceSchema, "providerUrl" | "url">,
  autoplay = false
) {
  switch (resource.providerUrl) {
    case "https://www.youtube.com/":
      return getVideoJsPlayer({
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: resource.url,
          },
        ],
        autoplay,
      });
    case "https://vimeo.com/":
      return getVimeoPlayer({ url: resource.url, autoplay });
    default:
      return getVideoJsPlayer({
        sources: [{ type: "application/vnd.apple.mpegurl", src: resource.url }],
        autoplay,
      });
  }
}

export default getPlayer;
