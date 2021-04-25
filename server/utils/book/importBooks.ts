import { UserSchema } from "$server/models/user";
import { BookProps, BookSchema } from "$server/models/book";
import { BooksImportParams, booksImportParamsSchema, BooksImportResult, booksImportResultSchema } from "$server/validators/booksImportParams";
import prisma from "$server/utils/prisma";
import aggregateTimeRequired from "./aggregateTimeRequired";
import findBook from "./findBook";
import sectionCreateInput from "./sectionCreateInput";

async function importBooksUtil(
  authorId: UserSchema["id"],
  params: BooksImportParams
): Promise<booksImportResultSchema | undefined> {
  console.log("importBooksUtil()");
  console.log(params);

  try {
    const obj = JSON.parse(params.json);
    const importBooks = Array.isArray(obj) ? obj : [obj];
    const books = [];

    for (let i = 0; i < importBooks.length; i++) {
      const book: BookProps = { ...importBooks[i] };
      book.publishedAt = new Date(book.publishedAt);
      book.createdAt = new Date(book.createdAt);
      book.updatedAt = new Date(book.updatedAt);
      book.keywords = { connectOrCreate: book.keywords.map(name => { return { create: { name }, where: { name } }; }) };
      book.author = { connect: { id: authorId } };
      book.ltiResourceLinks = {};
      const sections = [];
      book.timeRequired = 0;
      for (let s = 0; s < book.sections.length; s++) {
        const section = { order: s+1, name: book.sections[s].name };
        const topicSections = [];
        for (let t = 0; t < book.sections[s].topics.length; t++) {
          const topic = book.sections[s].topics[t];
          topic.createdAt = new Date(topic.createdAt);
          topic.updatedAt = new Date(topic.updatedAt);
          topic.keywords = { connectOrCreate: topic.keywords.map(name => { return { create: { name }, where: { name } }; }) };
          topic.resource.video = { create: { providerUrl: topic.resource.providerUrl, tracks: { create: topic.resource.tracks } } };
          delete topic.resource.providerUrl;
          delete topic.resource.tracks;
          topic.resource = { connectOrCreate: { create: topic.resource, where: { url: topic.resource.url } } };
          topic.creator = { connect: { id: authorId } };
          const topicSection = { order: t+1, topic: { create: topic } };
          topicSections.push(topicSection);
          book.timeRequired += topic.timeRequired;
        }
        section.topicSections = { create: topicSections };
        sections.push(section);
      }
      book.sections = { create: sections };
      books.push(prisma.book.create({ data: book }));
      console.log(book);
    }

    console.log(books);
    const result: BooksImportResult = { books: await prisma.$transaction(books), errors: [] };
    return result;
  } catch(e) {
    console.log(e);
    const errors = Array.isArray(e) ? e : [e.toString()];
    const result: BooksImportResult = { books: [], errors };
    return result;
  }
}

export default importBooksUtil;
