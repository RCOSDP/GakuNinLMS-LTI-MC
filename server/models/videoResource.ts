import { Resource, Video } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { VideoTrackSchema, videoTrackSchema } from "./videoTrack";

export type VideoResource = {
  url: Resource["url"];
  providerUrl: Video["providerUrl"];
  tracks: VideoTrackSchema[];
};

export type VideoResourcePropsSchema = Pick<VideoResource, "url">;
export type VideoResourceSchema = Resource &
  Pick<VideoResource, "providerUrl" | "tracks">;

const { id, url, details } = jsonSchema.definitions.Resource.properties;
const { providerUrl } = jsonSchema.definitions.Video.properties;

export const videoResourcePropsSchema = {
  type: "object",
  properties: {
    url,
  },
};

export const videoResourceSchema = {
  type: "object",
  properties: {
    id,
    url,
    details,
    providerUrl,
    tracks: {
      type: "array",
      items: videoTrackSchema,
    },
  },
};
