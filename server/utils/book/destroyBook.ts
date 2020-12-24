import { Book } from "@prisma/client";
import prisma from "$server/utils/prisma";
import cleanupSections from "./cleanupSections";

async function destroyBook(id: Book["id"]) {
  try {
    const sectionIds = (
      await prisma.section.findMany({
        where: { bookId: id },
        select: { id: true },
      })
    ).map(({ id }) => id);

    await prisma.$transaction([
      ...cleanupSections(sectionIds),
      prisma.ltiResourceLink.deleteMany({ where: { bookId: id } }),
      prisma.book.deleteMany({ where: { id } }),
    ]);
  } catch {
    return;
  }
}

export default destroyBook;
