import { Book } from "@prisma/client";
import prisma from "$server/utils/prisma";
import cleanupSections from "./cleanupSections";

async function destroyBook(id: Book["id"]) {
  try {
    await cleanupSections(id);
    await prisma.book.delete({ where: { id } });
  } catch {
    return;
  }
}

export default destroyBook;
