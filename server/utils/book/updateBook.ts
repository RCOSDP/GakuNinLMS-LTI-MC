import type { Book, PrismaPromise } from "@prisma/client";
import type { BookProps, BookSchema } from "$server/models/book";
import type { SectionProps } from "$server/models/book/section";
import prisma from "$server/utils/prisma";
import aggregateTimeRequired from "./aggregateTimeRequired";
import findBook from "./findBook";
import sectionCreateInput from "./sectionCreateInput";
import cleanupSections from "./cleanupSections";
import keywordsConnectOrCreateInput from "$server/utils/keyword/keywordsConnectOrCreateInput";
import keywordsDisconnectInput from "$server/utils/keyword/keywordsDisconnectInput";

function upsertSections(bookId: Book["id"], sections: SectionProps[]) {
  const sectionsCreateInput = sections.map(sectionCreateInput);
  return sectionsCreateInput.map((input, order) => {
    return prisma.section.create({
      data: { ...input, order, book: { connect: { id: bookId } } },
    });
  });
}

async function updateBook({
  id,
  sections,
  ...book
}: Pick<Book, "id"> & BookProps): Promise<BookSchema | undefined> {
  const ops: Array<PrismaPromise<unknown>> = [];

  if (sections != null) {
    const cleanup = cleanupSections(id);
    const upsert = upsertSections(id, sections);
    ops.push(...cleanup, ...upsert);
  }

  const timeRequired = sections && (await aggregateTimeRequired({ sections }));
  const keywords = await prisma.keyword.findMany({
    where: { books: { every: { id } } },
  });
  const update = prisma.book.update({
    where: { id },
    data: {
      ...book,
      ...(timeRequired && { timeRequired }),
      keywords: {
        ...keywordsConnectOrCreateInput(book.keywords ?? []),
        ...keywordsDisconnectInput(keywords, book.keywords ?? []),
      },
      updatedAt: new Date(),
    },
  });
  ops.push(update);

  await prisma.$transaction(ops);

  return await findBook(id);
}

export default updateBook;
