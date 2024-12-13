import type { Topic } from "@prisma/client";

import prisma from "$server/utils/prisma";

function findActivityTimeRangeCountByTopic(topicId: Topic["id"]) {
  return prisma.activityTimeRangeCount.findMany({
    select: {
      activityId: true,
      startMs: true,
      endMs: true,
      count: true,
    },
    where: {
      activity: { topicId: topicId },
    },
    orderBy: { activityId: "asc" },
  });
}

export default findActivityTimeRangeCountByTopic;
