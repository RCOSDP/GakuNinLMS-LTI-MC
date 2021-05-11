import { UserSchema } from "$server/models/user";
import { BookSchema } from "$server/models/book";
import {
  BooksImportParams,
  BooksImportResult,
} from "$server/validators/booksImportParams";
import prisma from "$server/utils/prisma";
import findBook from "./findBook";
import parse from "spdx-expression-parse";

async function importBooksUtil(
  authorId: UserSchema["id"],
  params: BooksImportParams
): Promise<BooksImportResult> {
  const util = new ImportBooksUtil(authorId, params);
  await util.importBooks();
  return util.result();
}

class ImportBooksUtil {
  static readonly BOOK_KEYS: string[] = [
    "name",
    "description",
    "language",
    "shared",
    "publishedAt",
    "createdAt",
    "updatedAt",
    "details",
    "keywords",
    "sections",
  ];
  static readonly SECTION_KEYS: string[] = ["name", "topics"];
  static readonly TOPIC_KEYS: string[] = [
    "name",
    "description",
    "language",
    "timeRequired",
    "shared",
    "createdAt",
    "updatedAt",
    "license",
    "details",
    "keywords",
    "resource",
  ];
  static readonly RESOURCE_KEYS: string[] = [
    "url",
    "providerUrl",
    "tracks",
    "details",
  ];
  static readonly TRACK_KEYS: string[] = ["kind", "language", "content"];

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

    this.validateObjectProperty(
      importBook,
      ImportBooksUtil.BOOK_KEYS,
      errorLabel
    );
    const book = {
      ...importBook,
      author: { connect: { id: this.authorId } },
      ltiResourceLinks: {},
    };

    book.name = this.validateString(book.name, false, "", `${errorLabel} 題名`);
    book.description = this.validateString(
      book.description,
      true,
      "",
      `${errorLabel} 概要`
    );
    book.language = this.validateString(
      book.language,
      true,
      "ja",
      `${errorLabel} 言語`
    );
    book.shared = this.validateBoolean(
      book.shared,
      true,
      true,
      `${errorLabel} 共有可否`
    );
    book.publishedAt = this.getDate(book.publishedAt, `${errorLabel} 公開日`);
    book.createdAt = this.getDate(book.createdAt, `${errorLabel} 作成日`);
    book.updatedAt = this.getDate(book.updatedAt, `${errorLabel} 更新日`);
    book.keywords = this.getKeywords(book.keywords, `${errorLabel} キーワード`);
    book.details = this.validateJson(
      book.details,
      true,
      {},
      `${errorLabel} 詳細`
    );

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

    this.validateObjectProperty(
      bookSection,
      ImportBooksUtil.SECTION_KEYS,
      errorLabel
    );
    const section = { order, name: bookSection.name, topicSections: {} };
    section.name = this.validateString(
      section.name,
      true,
      "",
      `${errorLabel} 名称`
    );

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

    this.validateObjectProperty(
      sectionTopic,
      ImportBooksUtil.TOPIC_KEYS,
      errorLabel
    );
    const topic = {
      ...sectionTopic,
      creator: { connect: { id: this.authorId } },
    };
    topic.name = this.validateString(
      topic.name,
      false,
      "",
      `${errorLabel} 名称`
    );
    topic.description = this.validateString(
      topic.description,
      true,
      "",
      `${errorLabel} 説明`
    );
    topic.language = this.validateString(
      topic.language,
      true,
      "ja",
      `${errorLabel} 言語`
    );
    topic.timeRequired = this.validateInteger(
      topic.timeRequired,
      true,
      0,
      `${errorLabel} 学習所要時間`
    );
    this.timeRequired += topic.timeRequired;
    topic.shared = this.validateBoolean(
      topic.shared,
      true,
      true,
      `${errorLabel} 共有可否`
    );
    topic.license = this.validateString(
      topic.license,
      true,
      "",
      `${errorLabel} ライセンス`
    );
    this.validateLicense(topic.license, errorLabel);
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

    this.validateObjectProperty(
      topic.resource,
      ImportBooksUtil.RESOURCE_KEYS,
      errorLabel
    );
    topic.resource.url = this.validateUrl(
      topic.resource.url,
      false,
      "",
      `${errorLabel} 外部リソースのアドレス`
    );
    topic.resource.video = {
      create: {
        providerUrl: this.getProviderUrl(
          topic.resource.providerUrl,
          topic.resource.url,
          `${errorLabel} 動画プロバイダーの識別子`
        ),
        tracks: this.getTracks(topic.resource.tracks, `${errorLabel} トラック`),
      },
    };
    topic.resource.details = this.validateJson(
      topic.resource.details,
      true,
      {},
      `${errorLabel} 外部リソースの詳細`
    );
    delete topic.resource.providerUrl;
    delete topic.resource.tracks;

    topic.resource = {
      connectOrCreate: {
        create: topic.resource,
        where: { url: topic.resource.url },
      },
    };
    topic.details = this.validateJson(
      topic.details,
      true,
      {},
      `${errorLabel} 詳細`
    );
    const topicSection = { order, topic: { create: topic } };
    return topicSection;
  }

  getTracks(tracks: any[], label: string) {
    if (!this.validateList(tracks, true, label) || !tracks?.length) return {};

    let error = false;
    for (const [index, track] of tracks.entries()) {
      const errorLabel = `${label}${index + 1}件目`;
      const err = !this.validateObject(
        track,
        false,
        `${errorLabel}: トラック情報がありません。`
      );
      error ||= err;
      if (err) continue;

      this.validateObjectProperty(
        track,
        ImportBooksUtil.TRACK_KEYS,
        errorLabel
      );
      track.kind = this.validateString(
        track.kind,
        true,
        "",
        `${errorLabel} 種別`
      );
      track.language = this.validateString(
        track.language,
        true,
        "ja",
        `${errorLabel} 言語`
      );
      track.content = this.validateString(
        track.content,
        true,
        "",
        `${errorLabel} 内容`
      );
    }

    return error ? {} : { create: tracks };
  }

  validateLicense(license: string, label: string) {
    if (license == null || !license.length) {
      return;
    }
    try {
      parse(license);
    } catch (e) {
      this.errors.push(
        `${label}: ライセンスを識別できません。https://spdx.org/licenses/ から有効なライセンスを選択してください。\n${e}`
      );
    }
  }

  getProviderUrl(providerUrl: string, url: string, label: string) {
    if (providerUrl == null) {
      try {
        return new URL("/", new URL(url)).toString();
      } catch (e) {
        this.errors.push(`${label}: 未指定です。URLを指定してください。`);
        return "";
      }
    } else {
      return this.validateUrl(providerUrl, false, "", label);
    }
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

  validateString(
    value: any,
    nullable: boolean,
    defaultValue: string,
    label: string
  ) {
    if (value == null) {
      if (!nullable)
        this.errors.push(
          `${label}: 空文字列です。1文字以上の文字列が必要です。`
        );
      return defaultValue;
    }
    if (typeof value != "string") {
      this.errors.push(`${label}: 文字列ではありません。`);
      return defaultValue;
    }
    if (!value.length) {
      if (!nullable)
        this.errors.push(
          `${label}: 空文字列です。1文字以上の文字列が必要です。`
        );
      return defaultValue;
    }
    return value;
  }

  validateInteger(
    value: any,
    nullable: boolean,
    defaultValue: number,
    label: string
  ) {
    if (value == null) {
      if (!nullable)
        this.errors.push(`${label}: 未指定です。整数値を指定してください。`);
      return defaultValue;
    }
    if (!Number.isInteger(value)) {
      this.errors.push(`${label}: 整数値ではありません。`);
      return defaultValue;
    }
    return value;
  }

  validateBoolean(
    value: any,
    nullable: boolean,
    defaultValue: boolean,
    label: string
  ) {
    if (value == null) {
      if (!nullable)
        this.errors.push(`${label}: 未指定です。真偽値を指定してください。`);
      return defaultValue;
    }
    if (typeof value != "boolean") {
      this.errors.push(`${label}: 真偽値ではありません。`);
      return defaultValue;
    }
    return value;
  }

  validateUrl(
    value: any,
    nullable: boolean,
    defaultValue: string,
    label: string
  ) {
    if (value == null) {
      if (!nullable)
        this.errors.push(`${label}: 未指定です。URLを指定してください。`);
      return defaultValue;
    }
    try {
      new URL(value);
    } catch (e) {
      this.errors.push(`${label}: URLではありません。`);
      return defaultValue;
    }
    return value;
  }

  validateJson(
    value: any,
    nullable: boolean,
    defaultValue: any,
    label: string
  ) {
    if (value == null) {
      if (!nullable)
        this.errors.push(
          `${label}: 未指定です。JSONオブジェクトを指定してください。`
        );
      return defaultValue;
    }
    if (typeof value != "object") {
      this.errors.push(`${label}: JSONオブジェクトではありません。`);
      return defaultValue;
    }
    try {
      JSON.stringify(value);
    } catch (e) {
      this.errors.push(`${label}: JSONオブジェクトではありません。`);
      return defaultValue;
    }
    return value;
  }

  validateObject(value: any, nullable: boolean, label: string) {
    if (value == null) {
      if (nullable) {
        return true;
      } else {
        this.errors.push(label);
        return false;
      }
    }
    if (typeof value != "object" || Array.isArray(value)) {
      this.errors.push(label);
      return false;
    }
    return true;
  }

  validateObjectProperty(value: any, allowed: string[], label: string) {
    const prop = Object.keys(value).filter((key) => !allowed.includes(key));
    if (prop.length) {
      this.errors.push(`${label}: 不明なプロパティがあります。${prop}`);
      return false;
    }
    return true;
  }

  validateList(list: any, nullable: boolean, label: string) {
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
