import type { Book, PrismaPromise } from "@prisma/client";
import type { BookProps, BookSchema } from "$server/models/book";
import type { SectionProps } from "$server/models/book/section";
import type { PublicBookSchema } from "$server/models/book/public";
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

async function updateBook(
  userId: number,
  { id, sections, publicBooks, ...book }: Pick<Book, "id"> & BookProps
): Promise<BookSchema | undefined> {
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

  ops.push(removePublicBooks(userId, id, publicBooks ?? []));
  ops.push(...upsertPublicBooks(userId, id, publicBooks ?? []));

  await prisma.$transaction(ops);

  return await findBook(id, userId);
}

function removePublicBooks(
  userId: number,
  bookId: Book["id"],
  publicBooks: PublicBookSchema[]
) {
  if (publicBooks.length) {
    return prisma.publicBook.deleteMany({
      where: {
        bookId,
        userId,
        id: { notIn: publicBooks.map((publicBook) => publicBook.id) },
      },
    });
  } else {
    return prisma.publicBook.deleteMany({ where: { bookId, userId } });
  }
}

function upsertPublicBooks(
  userId: number,
  bookId: Book["id"],
  publicBooks: PublicBookSchema[]
) {
  const ops: Array<PrismaPromise<unknown>> = [];
  for (const publicBook of publicBooks) {
    const id = publicBook.id;
    const data = {
      book: { connect: { id: bookId } },
      user: { connect: { id: userId } },
      expireAt: publicBook.expireAt,
      domains: publicBook.domains,
      token: String(Math.random()),
    };
    if (id) {
      ops.push(prisma.publicBook.update({ where: { id }, data }));
    } else {
      ops.push(prisma.publicBook.create({ data }));
    }
  }
  return ops;
}

export default updateBook;
