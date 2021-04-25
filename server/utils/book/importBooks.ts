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
  try {
    const obj = JSON.parse(params.json);
    const importBooks = Array.isArray(obj) ? obj : [obj];
    const books = [];

    for (const [index, importBook] of importBooks.entries()) {
      const book: BookProps = getBookProps(authorId, importBook);
      books.push(prisma.book.create({ data: book }));
    }

    const result: BooksImportResult = { books: await prisma.$transaction(books), errors: [] };
    return result;
  } catch(e) {
    console.error(e);
    const errors = Array.isArray(e) ? e : [e.toString()];
    const result: BooksImportResult = { books: [], errors };
    return result;
  }
}

function getBookProps(authorId: UserSchema["id"], importBook: Object): BookProps {
  const book: BookProps = { ...importBook, timeRequired: 0, author: { connect: { id: authorId } }, ltiResourceLinks: {} };
  book.publishedAt = getDate(book.publishedAt);
  book.createdAt = getDate(book.createdAt);
  book.updatedAt = getDate(book.updatedAt);
  book.keywords = getKeywords(book.keywords);

  const sections = [];
  for (const [index, bookSection] of book.sections.entries()) {
    const section = getSection(authorId, bookSection, index + 1);
    book.timeRequired += section.timeRequired;
    delete section.timeRequired;
    sections.push(section);
  }
  book.sections = { create: sections };
  return book;
}

function getSection(authorId: UserSchema["id"], bookSection: Object, order: Integer): Object {
  const section = { order, name: bookSection.name, timeRequired: 0 };
  const topicSections = [];
  for (const [index, sectionTopic] of bookSection.topics.entries()) {
    const topicSection = getTopicSection(authorId, sectionTopic, index + 1);
    section.timeRequired += topicSection.topic.create.timeRequired;
    topicSections.push(topicSection);
  }
  section.topicSections = { create: topicSections };
  return section;
}

function getTopicSection(authorId: UserSchema["id"], sectionTopic: Object, order: Integer): Object {
  const topic = { ...sectionTopic, creator: { connect: { id: authorId } } };
  topic.createdAt = getDate(topic.createdAt);
  topic.updatedAt = getDate(topic.updatedAt);
  topic.keywords = getKeywords(topic.keywords);
  topic.resource.video = { create: { providerUrl: topic.resource.providerUrl, tracks: { create: topic.resource.tracks } } };
  delete topic.resource.providerUrl;
  delete topic.resource.tracks;

  topic.resource = { connectOrCreate: { create: topic.resource, where: { url: topic.resource.url } } };
  const topicSection = { order, topic: { create: topic } };
  return topicSection;
}

function getDate(dateString: String): Date {
  return dateString ? new Date(dateString) : null;
}

function getKeywords(keywords: String[]): Object {
  return { connectOrCreate: keywords.map(name => { return { create: { name }, where: { name } }; }) };
}

export default importBooksUtil;
