import type { BookSchema } from "$server/models/book";
import prisma from "$server/utils/prisma";
import makeSortOrderQuery from "$server/utils/makeSortOrderQuery";
import {
  bookIncludingTopicsArg,
  bookToBookSchema,
} from "$server/utils/book/bookToBookSchema";

async function findBooks(
  sort = "updated",
  page: number,
  perPage: number
): Promise<BookSchema[]> {
  const books = await prisma.book.findMany({
    ...bookIncludingTopicsArg,
    orderBy: makeSortOrderQuery(sort),
    skip: page * perPage,
    take: perPage,
  });

  return books.map((book) => bookToBookSchema(book));
}

export default findBooks;
