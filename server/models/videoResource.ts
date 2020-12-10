import { Resource } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";

type VideoResource = {
  url: Resource["url"];
  providerUrl: "https://www.youtube.com/" | "https://vimeo.com/";
};

export default VideoResource;

export type VideoResourceSchema = Resource & Pick<VideoResource, "providerUrl">;

const { id, url, details } = jsonSchema.definitions.Resource.properties;
const { id: videoId, providerUrl } = jsonSchema.definitions.Video.properties;
export const videoResourceSchema = {
  type: "object",
  properties: {
    id,
    videoId,
    url,
    details,
    providerUrl,
  },
};
