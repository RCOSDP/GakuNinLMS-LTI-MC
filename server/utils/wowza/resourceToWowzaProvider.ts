import type { ResourceSchema } from "$server/models/resource";
import {
  WOWZA_THUMBNAIL_BASE_URL,
  WOWZA_THUMBNAIL_EXTENSION,
} from "$server/utils/env";
import { NEXT_PUBLIC_BASE_PATH } from "$utils/env";

/** リソースからwowzaのサムネイル画像URLに変換する */
function resourceToWowzaProvider(resource: ResourceSchema) {
  const path = new URL(resource.url).pathname
    .replace(/^[/]api[/]v2[/]wowza[/]/, "")
    .replace(/\.[^.]*$/, "");

  // 環境変数未設定の場合はデフォルト画像を返す
  if (!WOWZA_THUMBNAIL_BASE_URL) {
    return {
      version: "1.0",
      type: "link",
      thumbnail_url: `${NEXT_PUBLIC_BASE_PATH}/video-thumbnail-placeholder.png`,
    };
  }

  return {
    version: "1.0",
    type: "link",
    thumbnail_url: `${WOWZA_THUMBNAIL_BASE_URL}${path}.${WOWZA_THUMBNAIL_EXTENSION}`,
  };
}

export default resourceToWowzaProvider;
