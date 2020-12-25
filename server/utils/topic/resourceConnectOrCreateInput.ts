import { ResourceProps } from "$server/models/resource";
import { parse } from "$server/utils/videoResource";

function resourceConnectOrCreateInput(resource: ResourceProps) {
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

  return {
    connectOrCreate: { where: { url: resource.url }, create: resourceInput },
  };
}

export default resourceConnectOrCreateInput;
