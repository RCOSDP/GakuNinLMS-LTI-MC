import { IntervalTree } from "node-interval-tree";
import type { User, Topic, Activity, Prisma } from "@prisma/client";
import type { ActivityProps } from "$server/models/activity";
import type { ActivityTimeRangeProps } from "$server/models/activityTimeRange";
import prisma from "$server/utils/prisma";

function findActivity(learnerId: User["id"], topicId: Topic["id"]) {
  return prisma.activity.findUnique({
    where: { topicId_learnerId: { topicId, learnerId } },
    select: { id: true, timeRanges: { orderBy: { startMs: "asc" } } },
  });
}

function merge(
  self: ActivityTimeRangeProps[],
  other: ActivityTimeRangeProps[]
): ActivityTimeRangeProps[] {
  const tree = new IntervalTree();

  self.forEach(({ startMs, endMs }) => {
    tree.insert({ low: startMs, high: endMs });
  });

  other.forEach(({ startMs, endMs }) => {
    const [low, high] = [startMs, endMs];
    tree.search(low, high).forEach((range) => tree.remove(range));
    tree.insert({ low, high });
  });

  const timeRanges = [...tree.inOrder()].map(({ low, high }) => ({
    startMs: low,
    endMs: high,
  }));

  return timeRanges;
}

function cleanup(activityId: Activity["id"]) {
  return prisma.activityTimeRange.deleteMany({ where: { activityId } });
}

function upsert(
  learnerId: User["id"],
  topicId: Topic["id"],
  timeRanges: ActivityTimeRangeProps[]
) {
  const totalTimeMs = timeRanges.reduce(
    (a, { startMs, endMs }) => a + endMs - startMs,
    0
  );
  const input = {
    learner: { connect: { id: learnerId } },
    topic: { connect: { id: topicId } },
    totalTimeMs,
    timeRanges: { create: timeRanges },
  };
  return prisma.activity.upsert({
    where: { topicId_learnerId: { topicId, learnerId } },
    create: input,
    update: { ...input, updatedAt: new Date() },
  });
}

async function upsertActivity(
  learnerId: User["id"],
  topicId: Topic["id"],
  activity: ActivityProps
): Promise<ActivityProps> {
  const exists = await findActivity(learnerId, topicId);
  const timeRanges = merge(exists?.timeRanges ?? [], activity.timeRanges);

  await prisma.$transaction([
    ...(exists ? [cleanup(exists.id)] : []),
    (upsert(learnerId, topicId, timeRanges) as unknown) as Prisma.BatchPayload,
  ]);

  return { timeRanges };
}

export default upsertActivity;
