import { Topic } from "@prisma/client";
import prisma from "$server/utils/prisma";

async function destroyTopic(id: Topic["id"]) {
  try {
    await prisma.topic.delete({
      where: { id },
      include: {
        resource: { include: { video: { include: { tracks: true } } } },
      },
    });
  } catch {
    return;
  }
}

export default destroyTopic;
