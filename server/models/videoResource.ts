import { Resource, Track } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";

export type VideoResource = {
  url: Resource["url"];
  providerUrl: "https://www.youtube.com/" | "https://vimeo.com/";
  tracks: Pick<Track, "id" | "kind" | "language">[];
};

export type VideoResourcePropsSchema = Pick<VideoResource, "url">;
export type VideoResourceSchema = Resource &
  Pick<VideoResource, "providerUrl" | "tracks">;

const { id, url, details } = jsonSchema.definitions.Resource.properties;
const { providerUrl } = jsonSchema.definitions.Video.properties;
const {
  id: videoTrackId,
  kind,
  language,
} = jsonSchema.definitions.Track.properties;

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
      items: {
        type: "object",
        properties: { id: videoTrackId, kind, language },
      },
    },
  },
};
