import { UserSchema } from "$server/models/user";
import { BookSchema } from "$server/models/book";
import {
  BooksImportParams,
  BooksImportResult,
} from "$server/validators/booksImportParams";
import prisma from "$server/utils/prisma";
import findBook from "./findBook";

async function importBooksUtil(
  authorId: UserSchema["id"],
  params: BooksImportParams
): Promise<BooksImportResult> {
  const util = new ImportBooksUtil(authorId, params);
  await util.importBooks();
  return util.result();
}

class ImportBooksUtil {
  authorId: UserSchema["id"];
  params: BooksImportParams;
  timeRequired: number;
  books: BookSchema[];
  errors: string[];

  constructor(authorId: UserSchema["id"], params: BooksImportParams) {
    this.authorId = authorId;
    this.params = params;
    this.timeRequired = 0;
    this.books = [];
    this.errors = [];
  }

  async importBooks() {
    try {
      const obj = JSON.parse(this.params.json || "");
      const importBooks = Array.isArray(obj) ? obj : [obj];
      const transactions = [];

      for (const importBook of importBooks) {
        transactions.push(
          prisma.book.create({ data: this.getBookProps(importBook) })
        );
      }
      for (const book of await prisma.$transaction(transactions)) {
        const res = await findBook(book.id);
        if (res) this.books.push(res);
      }
    } catch (e) {
      console.error(e);
      Array.prototype.push.apply(
        this.errors,
        Array.isArray(e) ? e : [e.toString()]
      );
    }
  }

  result() {
    const result: BooksImportResult = {
      books: this.books,
      errors: this.errors,
    };
    return result;
  }

  getBookProps(importBook: any) {
    const book = {
      ...importBook,
      author: { connect: { id: this.authorId } },
      ltiResourceLinks: {},
    };
    book.publishedAt = this.getDate(book.publishedAt);
    book.createdAt = this.getDate(book.createdAt);
    book.updatedAt = this.getDate(book.updatedAt);
    book.keywords = this.getKeywords(book.keywords);

    const sections = [];
    for (const [index, bookSection] of book.sections.entries()) {
      sections.push(this.getSection(bookSection, index + 1));
    }
    book.sections = { create: sections };
    book.timeRequired = this.timeRequired;
    return book;
  }

  getSection(bookSection: any, order: number) {
    const section = { order, name: bookSection.name, topicSections: {} };
    const topicSections = [];
    for (const [index, sectionTopic] of bookSection.topics.entries()) {
      topicSections.push(this.getTopicSection(sectionTopic, index + 1));
    }
    section.topicSections = { create: topicSections };
    return section;
  }

  getTopicSection(sectionTopic: any, order: number) {
    const topic = {
      ...sectionTopic,
      creator: { connect: { id: this.authorId } },
    };
    this.timeRequired += topic.timeRequired;
    topic.createdAt = this.getDate(topic.createdAt);
    topic.updatedAt = this.getDate(topic.updatedAt);
    topic.keywords = this.getKeywords(topic.keywords);
    topic.resource.video = {
      create: {
        providerUrl: topic.resource.providerUrl,
        tracks: { create: topic.resource.tracks },
      },
    };
    delete topic.resource.providerUrl;
    delete topic.resource.tracks;

    topic.resource = {
      connectOrCreate: {
        create: topic.resource,
        where: { url: topic.resource.url },
      },
    };
    const topicSection = { order, topic: { create: topic } };
    return topicSection;
  }

  getDate(dateString: string) {
    return dateString ? new Date(dateString) : null;
  }

  getKeywords(keywords: string[]) {
    return {
      connectOrCreate: keywords.map((name) => {
        return { create: { name }, where: { name } };
      }),
    };
  }
}

export default importBooksUtil;
