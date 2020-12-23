import { Resource } from "@prisma/client";
import { VideoTrackProps, VideoTrackSchema } from "$server/models/videoTrack";
import prisma from "$server/utils/prisma";

async function createVideoTrack(
  resourceId: Resource["id"],
  videoTrack: VideoTrackProps
): Promise<undefined | VideoTrackSchema> {
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    select: { videoId: true },
  });

  if (!resource) return;
  if (resource.videoId == null) return;

  const created = await prisma.track.create({
    data: {
      ...videoTrack,
      video: { connect: { id: resource.videoId } },
    },
    select: { id: true, kind: true, language: true },
  });
  return created;
}

export default createVideoTrack;
