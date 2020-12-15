import { ResourceProps } from "$server/models/resource";
import { parse } from "$server/utils/videoResource";

function resourceCreateInput(resource: ResourceProps) {
  const videoProviderUrl = parse(resource.url)?.providerUrl;
  const videoCreateInput =
    videoProviderUrl == null
      ? undefined
      : { create: { providerUrl: videoProviderUrl, tracks: {} } };
  const resourceInput = {
    url: resource.url,
    details: {},
    video: videoCreateInput,
  };

  return { create: resourceInput };
}

export default resourceCreateInput;
