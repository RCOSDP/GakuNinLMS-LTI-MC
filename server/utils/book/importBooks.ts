import { UserSchema } from "$server/models/user";
import { BooksImportParams, booksImportParamsSchema, BooksImportResult, booksImportResultSchema } from "$server/validators/booksImportParams";
import prisma from "$server/utils/prisma";
import aggregateTimeRequired from "./aggregateTimeRequired";
import findBook from "./findBook";
import sectionCreateInput from "./sectionCreateInput";

async function importBooksUtil(
  authorId: UserSchema["id"],
  books: BooksImportParams
): Promise<booksImportResultSchema | undefined> {
  //const timeRequired = await aggregateTimeRequired(book);
  //const sectionsCreateInput = book.sections?.map(sectionCreateInput) ?? [];

  //const { id } = await prisma.book.create({
  //  data: {
  //    ...book,
  //    timeRequired,
  //    details: {},
  //    author: { connect: { id: authorId } },
  //    sections: { create: sectionsCreateInput },
  //  },
  //});

  //return findBook(id);

  console.log("importBooksUtil()");
  console.log(books);
  //const result: BooksImportResult = { books: [await findBook(1)], errors: [] };
  const result: BooksImportResult = { books: [], errors: [books.json] };
  console.log(result);
  return result;
}

export default importBooksUtil;
