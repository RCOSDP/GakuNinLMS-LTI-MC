import prisma from "$server/utils/prisma";
import type { ActivityTimeRangeSchema } from "$server/models/activityTimeRange";
import type { ActivitySchema } from "$server/models/activity";

async function fetchActivityTimeRange({
  activityId,
}: {
  activityId: ActivitySchema["id"];
}): Promise<Array<ActivityTimeRangeSchema>> {
  return await prisma.activityTimeRange.findMany({
    where: {
      activityId,
    },
  });
}

export default fetchActivityTimeRange;
