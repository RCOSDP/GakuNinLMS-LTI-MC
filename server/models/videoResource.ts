import { Resource, Video } from "$prisma/client";

type VideoResource = {
  url: Resource["url"];
  providerUrl: Video["providerUrl"];
};

export default VideoResource;
