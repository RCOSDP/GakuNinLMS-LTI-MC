import { UserSchema } from "$server/models/user";
import { BookProps, BookSchema } from "$server/models/book";
import prisma from "$server/utils/prisma";
import findBook from "./findBook";
import sectionCreateInput from "./sectionCreateInput";

async function createBook(
  authorId: UserSchema["id"],
  book: BookProps
): Promise<BookSchema | undefined> {
  const sectionsCreateInput = book.sections.map(sectionCreateInput);

  const { id } = await prisma.book.create({
    data: {
      ...book,
      details: {},
      author: { connect: { id: authorId } },
      sections: { create: sectionsCreateInput },
    },
  });

  return findBook(id);
}

export default createBook;
