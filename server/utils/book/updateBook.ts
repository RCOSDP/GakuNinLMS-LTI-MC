import { User, Book } from "@prisma/client";
import { BookProps, BookSchema } from "$server/models/book";
import { SectionProps } from "$server/models/book/section";
import prisma from "$server/utils/prisma";
import findBook from "./findBook";
import sectionCreateInput from "./sectionCreateInput";
import cleanupSections from "./cleanupSections";

async function upsertSections(bookId: Book["id"], sections: SectionProps[]) {
  const sectionsCreateInput = sections.map(sectionCreateInput);
  return prisma.$transaction(
    sectionsCreateInput.map((input, order) => {
      return prisma.section.create({
        data: { ...input, order, book: { connect: { id: bookId } } },
      });
    })
  );
}

async function updateBook(
  authorId: User["id"],
  { sections, ...book }: Pick<Book, "id"> & BookProps
): Promise<BookSchema | undefined> {
  const cleanup = cleanupSections(book.id);
  const upsert = upsertSections(book.id, sections ?? []);
  const update = prisma.book.update({
    where: { id: book.id },
    data: {
      ...book,
      author: { connect: { id: authorId } },
      updatedAt: new Date(),
    },
  });

  await prisma.$transaction([cleanup, upsert, update]);

  return findBook(book.id);
}

export default updateBook;
