import prisma from "$server/utils/prisma";
import type { ActivityTimeRangeSchema } from "$server/models/activityTimeRange";
import type { ActivitySchema } from "$server/models/activity";
import type { SessionSchema } from "$server/models/session";

async function fetchActivityTimeRange({
  session,
  activityId,
}: {
  session: SessionSchema;
  activityId: ActivitySchema["id"];
}): Promise<Array<ActivityTimeRangeSchema>> {
  return await prisma.activityTimeRange.findMany({
    where: {
      activityId,
      activity: {
        learner: {
          id: session.user.id,
        },
      },
    },
  });
}

export default fetchActivityTimeRange;
