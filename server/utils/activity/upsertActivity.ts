import { IntervalTree } from "$server/utils/intervalTree";
import type {
  User,
  Topic,
  Activity,
  LtiConsumer,
  LtiContext,
} from "@prisma/client";
import type { ActivityProps } from "$server/validators/activityProps";
import type { ActivityTimeRangeProps } from "$server/validators/activityTimeRange";
import prisma from "$server/utils/prisma";

function findActivity({
  learnerId,
  topicId,
  ltiConsumerId,
  ltiContextId,
}: {
  learnerId: User["id"];
  topicId: Topic["id"];
  ltiConsumerId: LtiConsumer["id"];
  ltiContextId: LtiContext["id"];
}) {
  return prisma.activity.findUnique({
    where: {
      topicId_learnerId_ltiConsumerId_ltiContextId: {
        topicId,
        learnerId,
        ltiConsumerId,
        ltiContextId,
      },
    },
    select: { id: true, timeRanges: { orderBy: { startMs: "asc" } } },
  });
}

function toInterval({ startMs, endMs }: ActivityTimeRangeProps) {
  return { low: startMs, high: endMs };
}

function merge(
  self: ActivityTimeRangeProps[],
  other: ActivityTimeRangeProps[]
): ActivityTimeRangeProps[] {
  const tree = new IntervalTree();

  self.forEach((range) => tree.insert(toInterval(range)));
  other.forEach((range) => tree.insertOrExpand(toInterval(range)));

  const timeRanges = [...tree.inOrder()].map(({ low, high }) => ({
    startMs: low,
    endMs: high,
  }));

  return timeRanges;
}

function cleanup(activityId: Activity["id"]) {
  return prisma.activityTimeRange.deleteMany({ where: { activityId } });
}

function upsert({
  learnerId,
  topicId,
  ltiConsumerId,
  ltiContextId,
  timeRanges,
}: {
  learnerId: User["id"];
  topicId: Topic["id"];
  ltiConsumerId: LtiConsumer["id"];
  ltiContextId: LtiContext["id"];
  timeRanges: ActivityTimeRangeProps[];
}) {
  const totalTimeMs = timeRanges.reduce(
    (a, { startMs, endMs }) => a + endMs - startMs,
    0
  );
  const input = {
    totalTimeMs,
    timeRanges: { create: timeRanges },
  };
  return prisma.activity.upsert({
    where: {
      topicId_learnerId_ltiConsumerId_ltiContextId: {
        topicId,
        learnerId,
        ltiConsumerId,
        ltiContextId,
      },
    },
    create: {
      ...input,
      learner: { connect: { id: learnerId } },
      topic: { connect: { id: topicId } },
      ltiContext: {
        connect: {
          consumerId_id: { consumerId: ltiConsumerId, id: ltiContextId },
        },
      },
    },
    update: { ...input, updatedAt: new Date() },
  });
}

async function upsertActivity({
  learnerId,
  topicId,
  ltiConsumerId = "",
  ltiContextId = "",
  activity,
}: {
  learnerId: User["id"];
  topicId: Topic["id"];
  ltiConsumerId?: LtiConsumer["id"];
  ltiContextId?: LtiContext["id"];
  activity: ActivityProps;
}): Promise<ActivityProps> {
  const exists = await findActivity({
    learnerId,
    topicId,
    ltiConsumerId,
    ltiContextId,
  });
  const timeRanges = merge(exists?.timeRanges ?? [], activity.timeRanges);

  await prisma.$transaction([
    ...(exists ? [cleanup(exists.id)] : []),
    upsert({ learnerId, topicId, ltiConsumerId, ltiContextId, timeRanges }),
  ]);

  return { timeRanges };
}

export default upsertActivity;
