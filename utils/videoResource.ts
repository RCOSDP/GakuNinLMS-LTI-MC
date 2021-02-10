import { ResourceSchema } from "$server/models/resource";
import { VideoResource } from "$server/models/videoResource";

export { parse } from "$server/utils/videoResource";

export function isVideoResource(
  resource: ResourceSchema | VideoResource | undefined
): resource is VideoResource {
  if (!resource) return false;
  return "tracks" in resource;
}
