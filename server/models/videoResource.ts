import type { Resource, Video } from "@prisma/client";
import type { VideoTrackSchema } from "./videoTrack";
import { videoTrackSchema } from "./videoTrack";

export type VideoResource = {
  url: Resource["url"];
  providerUrl: Video["providerUrl"];
  tracks: VideoTrackSchema[];
};

export type VideoResourcePropsSchema = Pick<VideoResource, "url">;
export type VideoResourceSchema = Resource &
  Pick<VideoResource, "providerUrl" | "tracks">;

export const videoResourcePropsSchema = {
  type: "object",
  properties: {
    url: { type: "string" },
  },
} as const;

export const videoResourceSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    url: { type: "string" },
    details: { type: "object" },
    providerUrl: { type: "string", nullable: true },
    tracks: {
      type: "array",
      items: videoTrackSchema,
    },
  },
} as const;
