import { Resource } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";

export type VideoResource = {
  url: Resource["url"];
  providerUrl: "https://www.youtube.com/" | "https://vimeo.com/";
};

export type VideoResourcePropsSchema = Pick<VideoResource, "url">;
export type VideoResourceSchema = Resource & Pick<VideoResource, "providerUrl">;

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
  },
};
