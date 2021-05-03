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
  now: Date;

  constructor(authorId: UserSchema["id"], params: BooksImportParams) {
    this.authorId = authorId;
    this.params = params;
    this.timeRequired = 0;
    this.books = [];
    this.errors = [];
    this.now = new Date();
  }

  async importBooks() {
    try {
      const importBooks = this.parseJson();
      if (this.errors.length) return;

      const transactions = [];
      for (const [index, importBook] of importBooks.entries()) {
        transactions.push(
          prisma.book.create({ data: this.getBookProps(importBook, index + 1) })
        );
      }
      this.errors.push("debug");
      if (this.errors.length) return;

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

  parseJson() {
    try {
      const obj = JSON.parse(this.params.json || "");
      return Array.isArray(obj) ? obj : [obj];
    } catch (e) {
      this.errors.push(`入力されたjsonテキストを解釈できません。\n${e}`);
      return [];
    }
  }

  getBookProps(importBook: any, order: number) {
    if (
      typeof importBook != "object" ||
      Array.isArray(importBook) ||
      importBook == null
    ) {
      this.errors.push(`${order}件目: ブック情報がありません。`);
      return;
    }

    const book = {
      ...importBook,
      author: { connect: { id: this.authorId } },
      ltiResourceLinks: {},
    };
    book.publishedAt = this.getDate(
      book.publishedAt,
      `ブック${order}件目 公開日:`
    );
    book.createdAt = this.getDate(book.createdAt, `ブック${order}件目 作成日:`);
    book.updatedAt = this.getDate(book.updatedAt, `ブック${order}件目 更新日:`);
    book.keywords = this.getKeywords(book.keywords, `ブック${order}件目:`);

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
    topic.createdAt = this.getDate(
      topic.createdAt,
      `トピック${order}件目 作成日:`
    );
    topic.updatedAt = this.getDate(
      topic.updatedAt,
      `トピック${order}件目 更新日:`
    );
    topic.keywords = this.getKeywords(topic.keywords, `トピック${order}件目:`);
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

  getDate(dateString: string, label: string) {
    try {
      const date = dateString ? new Date(dateString) : this.now;
      if (Number.isNaN(date.getTime())) {
        this.errors.push(`${label} 日付を解釈できません。`);
        return null;
      }
      return date;
    } catch (e) {
      this.errors.push(`${label} 日付を解釈できません。`);
      return null;
    }
  }

  getKeywords(keywords: string[], label: string) {
    if (keywords == null) return {};
    if (!Array.isArray(keywords)) {
      this.errors.push(`${label} キーワードがリストではありません。`);
      return {};
    }
    if (!keywords.length) return {};
    for (const keyword of keywords) {
      if (typeof keyword != "string" || !keyword.length) {
        this.errors.push(`${label} キーワードが文字ではないか空です。`);
        return {};
      }
    }

    return {
      connectOrCreate: keywords.map((name) => {
        return { create: { name }, where: { name } };
      }),
    };
  }
}

export default importBooksUtil;
