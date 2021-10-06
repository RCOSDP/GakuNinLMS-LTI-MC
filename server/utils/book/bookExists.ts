import type { Book } from "@prisma/client";
import prisma from "$server/utils/prisma";

function bookExists(bookId: Book["id"]) {
  return prisma.book.findUnique({
    where: { id: bookId },
    select: { creatorId: true },
  });
}

export default bookExists;
