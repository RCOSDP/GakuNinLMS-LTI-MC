import { Book } from "@prisma/client";
import prisma from "$server/utils/prisma";
import destroyTopic from "$server/utils/topic/destroyTopic";
import cleanupSections from "./cleanupSections";

async function destroyBook(id: Book["id"]) {
  const sectionIds = (
    await prisma.section.findMany({
      where: { bookId: id },
      select: { id: true },
    })
  ).map(({ id }) => id);

  const topicIds = (
    await prisma.topicSection.findMany({
      where: { sectionId: { in: sectionIds } },
      select: { topicId: true },
    })
  ).map(({ topicId }) => topicId);

  try {
    await prisma.$transaction([
      ...cleanupSections(sectionIds),
      prisma.ltiResourceLink.deleteMany({ where: { bookId: id } }),
      prisma.book.deleteMany({ where: { id } }),
    ]);

    await Promise.all(topicIds.map(destroyTopic));
  } catch (error) {
    console.error(error.stack);
    return;
  }
}

export default destroyBook;
