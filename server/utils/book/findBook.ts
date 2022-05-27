import type { Book } from "@prisma/client";
import type { BookSchema } from "$server/models/book";
import prisma from "$server/utils/prisma";
import {
  getBookIncludingArg,
  bookToBookSchema,
} from "$server/utils/book/bookToBookSchema";

async function findBook(
  bookId: Book["id"],
  userId: number,
  ip: string
): Promise<BookSchema | undefined> {
  const book = await prisma.book.findUnique({
    ...getBookIncludingArg(userId),
    where: { id: bookId },
  });
  if (book == null) return;

  return bookToBookSchema(book, ip);
}

export default findBook;
