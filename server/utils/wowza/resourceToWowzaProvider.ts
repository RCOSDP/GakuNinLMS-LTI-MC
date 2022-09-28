import type { ResourceSchema } from "$server/models/resource";
import { WOWZA_THUMBNAIL_BASE_URL, WOWZA_THUMBNAIL_EXTENSION } from "$server/utils/env";

/** リソースからoEmbed Providerを得る */
function resourceToWowzaProvider(resource: ResourceSchema) {
  const url = resource.url;
  const imageUrl = url.substring(url.indexOf("/wowza/") + 7);
  const extensition = url.slice(url.lastIndexOf("."));
  const imgPath = imageUrl.substring(0, imageUrl.indexOf(extensition));

  return {
    thumbnail_url: `${WOWZA_THUMBNAIL_BASE_URL}${imgPath}.${WOWZA_THUMBNAIL_EXTENSION}`,
  };
}

export default resourceToWowzaProvider;
