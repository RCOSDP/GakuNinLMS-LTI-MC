import { Prisma } from "@prisma/client";
import { ResourceSchema } from "$server/models/resource";

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
  return { ...resource.video, ...resource };
}
