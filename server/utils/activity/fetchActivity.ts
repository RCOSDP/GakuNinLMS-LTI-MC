import type { ActivitySchema } from "$server/models/activity";
import type { UserSchema } from "$server/models/user";
import type { BookSchema } from "$server/models/book";
import prisma from "$server/utils/prisma";
import isCompleted from "./isCompleted";

async function fetchActivity(
  learnerId: UserSchema["id"],
  bookId: BookSchema["id"]
): Promise<Array<ActivitySchema>> {
  const activity = await prisma.activity.findMany({
    include: {
      learner: { select: { id: true, name: true } },
      topic: { select: { id: true, name: true, timeRequired: true } },
    },
    where: {
      learnerId,
      topic: { topicSection: { some: { section: { bookId } } } },
      // TODO: コースごとでの活動を取得できるようにしてほしい
      ltiConsumerId: "",
      ltiContextId: "",
    },
  });

  return activity.map((a) => ({ ...a, completed: isCompleted(a.topic, a) }));
}

export default fetchActivity;
