import type { Book } from "@prisma/client";
import prisma from "$server/utils/prisma";
import {
  authorArg,
  authorToAuthorSchema,
} from "$server/utils/author/authorToAuthorSchema";

async function bookExists(bookId: Book["id"]) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: { authors: authorArg },
  });

  return book && { ...book, authors: book.authors.map(authorToAuthorSchema) };
}

export default bookExists;
