import { Topic } from "@prisma/client";
import prisma from "$server/utils/prisma";
import destroyResource from "$server/utils/resource/destroyResource";

async function destroyTopic(id: Topic["id"]) {
  const topic = await prisma.topic.findUnique({
    where: { id },
    select: { resourceId: true },
  });

  if (!topic) return;

  try {
    await prisma.$transaction([
      prisma.activity.deleteMany({ where: { topicId: id } }),
      prisma.topic.deleteMany({ where: { id } }),
    ]);
    await destroyResource(topic.resourceId);
  } catch {
    return;
  }
}

export default destroyTopic;
