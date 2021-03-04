import { ResourceSchema } from "$server/models/resource";
import { VideoResource } from "$server/models/videoResource";
import { parse } from "$server/utils/videoResource";
import validVideoResource from "$server/utils/validVideoResource";
import { NEXT_PUBLIC_API_BASE_PATH } from "./env";

export { parse };

export function isVideoResource(
  resource: ResourceSchema | VideoResource | undefined
): resource is VideoResource {
  return resource != null && "tracks" in resource;
}

export function validVideo(url: string | undefined): VideoResource | undefined {
  if (!url) return;
  if (!validVideoResource({ url }, NEXT_PUBLIC_API_BASE_PATH)) return;

  return parse(url);
}
