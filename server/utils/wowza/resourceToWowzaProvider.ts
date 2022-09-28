import type { ResourceSchema } from "$server/models/resource";
import {
  WOWZA_THUMBNAIL_BASE_URL,
  WOWZA_THUMBNAIL_EXTENSION,
} from "$server/utils/env";

/** リソースからwowzaのサムネイル画像URLに変換する */
function resourceToWowzaProvider(resource: ResourceSchema) {
  const path = new URL(resource.url).pathname
    .replace(/^[/]api[/]v2[/]wowza[/]/, "")
    .replace(/\.[^.]*$/, "");

  return {
    version: "1.0",
    type: "link",
    thumbnail_url: `${WOWZA_THUMBNAIL_BASE_URL}${path}.${WOWZA_THUMBNAIL_EXTENSION}`,
  };
}

export default resourceToWowzaProvider;
