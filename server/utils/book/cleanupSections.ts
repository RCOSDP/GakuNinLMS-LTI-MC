import { Book } from "@prisma/client";
import prisma from "$server/utils/prisma";

async function cleanupSections(id: Book["id"]) {
  const sections = await prisma.section.findMany({
    where: { bookId: id },
    select: { id: true },
  });

  return prisma.$transaction(
    sections.flatMap(({ id }) => {
      return [
        prisma.topicSection.deleteMany({ where: { sectionId: id } }),
        prisma.section.deleteMany({ where: { id } }),
      ];
    })
  );
}

export default cleanupSections;
