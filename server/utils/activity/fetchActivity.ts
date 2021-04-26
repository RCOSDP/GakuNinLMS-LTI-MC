import { ActivitySchema } from "$server/models/activity";
import { UserSchema } from "$server/models/user";
import { BookSchema } from "$server/models/book";
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
      AND: [
        { learnerId },
        { topic: { topicSection: { some: { section: { bookId } } } } },
      ],
    },
  });

  return activity.map((a) => ({ ...a, completed: isCompleted(a.topic, a) }));
}

export default fetchActivity;
