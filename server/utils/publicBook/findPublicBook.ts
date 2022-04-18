import type { PublicBook } from "@prisma/client";
import prisma from "$server/utils/prisma";

async function findPublicBook(
  token: PublicBook["token"]
): Promise<PublicBook | null> {
  return await prisma.publicBook.findUnique({ where: { token: token } });
}

export default findPublicBook;
