import { ResourceSchema } from "$server/models/resource";
import { VideoResource } from "$server/models/videoResource";
import { parse } from "$server/utils/videoResource";
import isValidVideoResource from "$server/utils/isValidVideoResource";
import { NEXT_PUBLIC_API_BASE_PATH } from "./env";

export { parse };

export function isVideoResource(
  resource: ResourceSchema | VideoResource | undefined
): resource is VideoResource {
  return resource != null && "providerUrl" in resource;
}

export function getValidVideoResource(
  url: string | undefined
): VideoResource | undefined {
  if (!url) return;
  if (!isValidVideoResource({ url }, NEXT_PUBLIC_API_BASE_PATH)) return;

  return parse(url);
}
