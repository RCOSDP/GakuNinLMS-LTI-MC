import { Prisma } from "@prisma/client";
import { ResourceSchema } from "$server/models/resource";
import { API_BASE_PATH } from "$server/utils/env";

export const resourceWithVideoArg = {
  include: {
    video: {
      include: { tracks: { select: { id: true, kind: true, language: true } } },
    },
  },
} as const;

type ResourceWithVideo = Prisma.ResourceGetPayload<typeof resourceWithVideoArg>;

export function resourceToResourceSchema(
  resource: ResourceWithVideo
): ResourceSchema {
  return {
    ...resource.video,
    tracks: resource.video?.tracks.map((track) => ({
      ...track,
      url: `${API_BASE_PATH}/resource/${resource.id}/video_track/${track.id}/vtt`,
    })),
    ...resource,
  };
}
