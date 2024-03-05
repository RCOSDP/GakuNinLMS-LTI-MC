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
import type { ActivityTimeRangeLogProps } from "$server/validators/activityTimeRangeLog";
import prisma from "$server/utils/prisma";

var NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL2 = Number(
  process.env.NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL ?? 10
);

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

function findRecentActivityTimeRangeLog(activityId: Activity["id"]) {
  const date = new Date();
  date.setSeconds(
    date.getSeconds() - NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL2 * 1.5
  );
  return prisma.activityTimeRangeLog.findMany({
    where: {
      activityId: activityId,
      createdAt: {
        gte: date,
      },
    },
    orderBy: { createdAt: "desc" },
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

function merge_and_push(
  self: ActivityTimeRangeLogProps[],
  other: ActivityTimeRangeProps[]
): ActivityTimeRangeProps[] {
  let tmpTimeRanges = [];

  self.forEach((range) => tmpTimeRanges.push(toInterval(range)));
  tmpTimeRanges = tmpTimeRanges.filter(
    (element, index, exist) =>
      exist.findIndex(
        (e) => e.low === element.low && e.high && element.high
      ) === index
  );

  //直近のものを重複排除しつつ、継続視聴の場合は mergeして追記をしないといけない
  other.forEach((range) => {
    const interval = toInterval(range);

    // 重複してたら飛ばす
    let duplicatedTimeRanges = tmpTimeRanges.find(
      (exist) => exist.low == interval.low && exist.high == interval.high
    );
    if (duplicatedTimeRanges) {
      return;
    }

    // startMsが同じでかつ、DB上のレコードのendMsが新しく渡されたデータのendMsより小さい場合、視聴中を表すレコードとしてDB上のレコードを省く
    tmpTimeRanges = tmpTimeRanges.filter(
      (exist) => !(exist.low == interval.low && exist.high < interval.high)
    );
    tmpTimeRanges.push(interval);
  });

  const timeRanges = tmpTimeRanges.map(
    ({ low, high, created_at, updated_at }) => ({
      startMs: low,
      endMs: high,
      createdAt: created_at,
      updatedAt: updated_at,
    })
  );

  return timeRanges;
}

function cleanup(activityId: Activity["id"]) {
  return prisma.activityTimeRange.deleteMany({ where: { activityId } });
}

function cleanupRecentTimeRangeLogs(
  timeRangeLogs: ActivityTimeRangeLogProps[]
) {
  const ids = timeRangeLogs.map((log) => {
    return log.id;
  });
  return prisma.activityTimeRangeLog.deleteMany({ where: { id: { in: ids } } });
}

function upsert({
  learnerId,
  topicId,
  ltiConsumerId,
  ltiContextId,
  timeRanges,
  timeRangeLogs,
}: {
  learnerId: User["id"];
  topicId: Topic["id"];
  ltiConsumerId: LtiConsumer["id"];
  ltiContextId: LtiContext["id"];
  timeRanges: ActivityTimeRangeProps[];
  timeRangeLogs: ActivityTimeRangeLogProps[];
}) {
  const totalTimeMs = timeRanges.reduce(
    (a, { startMs, endMs }) => a + endMs - startMs,
    0
  );
  const input = {
    totalTimeMs,
    timeRanges: { create: timeRanges },
    timeRangeLogs: { create: timeRangeLogs },
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

  const recentTimeRangeLogs = await findRecentActivityTimeRangeLog(exists?.id);

  const timeRanges = merge(exists?.timeRanges ?? [], activity.timeRanges);
  const timeRangeLogs = merge_and_push(
    recentTimeRangeLogs,
    activity.timeRanges
  );

  await prisma.$transaction([
    ...(exists ? [cleanupRecentTimeRangeLogs(recentTimeRangeLogs)] : []),
    ...(exists ? [cleanup(exists.id)] : []),
    upsert({
      learnerId,
      topicId,
      ltiConsumerId,
      ltiContextId,
      timeRanges,
      timeRangeLogs,
    }),
  ]);

  return { timeRanges };
}

export default upsertActivity;
