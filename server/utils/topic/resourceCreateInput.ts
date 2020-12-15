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

  return {
    where: { url: resourceInput.url },
    create: resourceInput,
    update: resourceInput,
  };
}

export default resourceCreateInput;
