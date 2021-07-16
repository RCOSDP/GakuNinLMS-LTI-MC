import { VideoResource } from "$server/models/videoResource";
import { providerMatch } from "$server/utils/videoResource";

function isValidVideoResource(
  videoResource: Pick<VideoResource, "url">,
  additionalProviderUrl: string
): boolean {
  return (
    providerMatch(videoResource.url) ||
    (additionalProviderUrl !== "" &&
      videoResource.url.startsWith(additionalProviderUrl))
  );
}

export default isValidVideoResource;
