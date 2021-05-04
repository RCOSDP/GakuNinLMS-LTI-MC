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
  books: BookSchema[];
  errors: string[];

  timeRequired: number;
  now: Date;
  errorLabelBook: string;
  errorLabelSection: string;
  errorLabelTopic: string;

  constructor(authorId: UserSchema["id"], params: BooksImportParams) {
    this.authorId = authorId;
    this.params = params;
    this.books = [];
    this.errors = [];

    this.timeRequired = 0;
    this.now = new Date();
    this.errorLabelBook = "";
    this.errorLabelSection = "";
    this.errorLabelTopic = "";
  }

  async importBooks() {
    try {
      const importBooks = this.parseJson();
      if (this.errors.length) return;

      const transactions = [];
      for (const [index, importBook] of importBooks.entries()) {
        this.errorLabelBook = `ブック${index + 1}件目`;
        transactions.push(
          prisma.book.create({ data: this.getBookProps(importBook) })
        );
      }
      //throw "debug";
      if (this.errors.length) return;

      for (const book of await prisma.$transaction(transactions)) {
        const res = await findBook(book.id);
        if (res) this.books.push(res as BookSchema);
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

  getBookProps(importBook: any) {
    const errorLabel = this.errorLabelBook;
    if (
      !this.validateObject(
        importBook,
        false,
        `${errorLabel}: ブック情報がありません。`
      )
    )
      return;

    const book = {
      ...importBook,
      author: { connect: { id: this.authorId } },
      ltiResourceLinks: {},
    };
    book.publishedAt = this.getDate(book.publishedAt, `${errorLabel} 公開日`);
    book.createdAt = this.getDate(book.createdAt, `${errorLabel} 作成日`);
    book.updatedAt = this.getDate(book.updatedAt, `${errorLabel} 更新日`);
    book.keywords = this.getKeywords(book.keywords, `${errorLabel} キーワード`);

    if (!this.validateList(book.sections, false, `${errorLabel} セクション`))
      return;
    const sections = [];
    for (const [index, bookSection] of book.sections.entries()) {
      this.errorLabelSection = `セクション${index + 1}件目`;
      sections.push(this.getSection(bookSection, index + 1));
    }
    book.sections = { create: sections };
    book.timeRequired = this.timeRequired;
    return book;
  }

  getSection(bookSection: any, order: number) {
    const errorLabel = `${this.errorLabelBook} ${this.errorLabelSection}`;
    if (
      !this.validateObject(
        bookSection,
        false,
        `${errorLabel}: セクション情報がありません。`
      )
    )
      return;

    const section = { order, name: bookSection.name, topicSections: {} };

    if (!this.validateList(bookSection.topics, false, `${errorLabel} トピック`))
      return;
    const topicSections = [];
    for (const [index, sectionTopic] of bookSection.topics.entries()) {
      this.errorLabelTopic = `トピック${index + 1}件目`;
      topicSections.push(this.getTopicSection(sectionTopic, index + 1));
    }
    section.topicSections = { create: topicSections };
    return section;
  }

  getTopicSection(sectionTopic: any, order: number) {
    const errorLabel = `${this.errorLabelBook} ${this.errorLabelSection} ${this.errorLabelTopic}`;
    if (
      !this.validateObject(
        sectionTopic,
        false,
        `${errorLabel}: トピック情報がありません。`
      )
    )
      return;

    const topic = {
      ...sectionTopic,
      creator: { connect: { id: this.authorId } },
    };
    this.timeRequired += topic.timeRequired;
    topic.createdAt = this.getDate(topic.createdAt, `${errorLabel} 作成日`);
    topic.updatedAt = this.getDate(topic.updatedAt, `${errorLabel} 更新日`);
    topic.keywords = this.getKeywords(
      topic.keywords,
      `${errorLabel} キーワード`
    );
    if (
      !this.validateObject(
        topic.resource,
        false,
        `${errorLabel}: リソース情報がありません。`
      )
    )
      return;

    topic.resource.video = {
      create: {
        providerUrl: topic.resource.providerUrl,
        tracks: this.getTracks(topic.resource.tracks, `${errorLabel} トラック`),
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

  getTracks(tracks: any[], label: string) {
    if (!this.validateList(tracks, true, label) || !tracks?.length) return {};

    let error = false;
    for (const [index, track] of tracks.entries()) {
      const err = !this.validateObject(
        track,
        false,
        `${label}${index + 1}件目: トラック情報がありません。`
      );
      error ||= err;
    }

    return error ? {} : { create: tracks };
  }

  getDate(dateString: string, label: string) {
    try {
      const date = dateString ? new Date(dateString) : this.now;
      if (Number.isNaN(date.getTime())) {
        this.errors.push(`${label}: 日付を解釈できません。`);
        return null;
      }
      return date;
    } catch (e) {
      this.errors.push(`${label}: 日付を解釈できません。`);
      return null;
    }
  }

  getKeywords(keywords: string[], label: string) {
    if (!this.validateList(keywords, true, label) || !keywords?.length)
      return {};
    for (const keyword of keywords) {
      if (typeof keyword != "string" || !keyword.length) {
        this.errors.push(`${label}: 文字ではないか空です。`);
        return {};
      }
    }

    return {
      connectOrCreate: keywords.map((name) => {
        return { create: { name }, where: { name } };
      }),
    };
  }

  validateObject(obj: any, nullable: boolean, label: string) {
    if (obj == null) {
      if (nullable) {
        return true;
      } else {
        this.errors.push(label);
        return false;
      }
    }
    if (typeof obj != "object" || Array.isArray(obj)) {
      this.errors.push(label);
      return false;
    }
    return true;
  }

  validateList(list: any[], nullable: boolean, label: string) {
    if (list == null) {
      if (nullable) {
        return true;
      } else {
        this.errors.push(`${label}: 空です。1個以上の要素が必要です。`);
        return false;
      }
    }
    if (!Array.isArray(list)) {
      this.errors.push(`${label}: リストになっていません。`);
      return false;
    }
    if (!list.length) {
      if (nullable) {
        return true;
      } else {
        this.errors.push(`${label}: 空です。1個以上の要素が必要です。`);
        return false;
      }
    }
    return true;
  }
}

export default importBooksUtil;
