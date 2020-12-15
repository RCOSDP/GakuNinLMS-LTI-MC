import { Resource } from "@prisma/client";
import prisma from "$server/utils/prisma";

async function destroyResource(id: Resource["id"]) {
  const video = await prisma.resource
    .findUnique({ where: { id } })
    .video({ select: { id: true } });

  const tasks = video
    ? [
        prisma.track.deleteMany({ where: { videoId: video.id } }),
        prisma.video.deleteMany({ where: { id: video.id } }),
      ]
    : [];

  tasks.push(prisma.resource.deleteMany({ where: { id } }));

  return prisma.$transaction(tasks);
}

export default destroyResource;
