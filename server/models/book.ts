import { Book, Prisma } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { UserSchema, userSchema } from "./user";
import {
  SectionProps,
  sectionPropsSchema,
  SectionSchema,
  sectionSchema,
} from "./book/section";
import {
  LtiResourceLinkSchema,
  ltiResourceLinkSchema,
} from "./ltiResourceLink";

export type BookProps = Omit<
  Prisma.BookCreateWithoutAuthorInput,
  "details" | "sections"
> & {
  sections: SectionProps[];
};

export type BookSchema = Omit<Book, "authorId"> & {
  author: UserSchema;
  sections: SectionSchema[];
  ltiResourceLinks: LtiResourceLinkSchema[];
};

const {
  id,
  name,
  abstract,
  language,
  timeRequired,
  shared,
  publishedAt,
  createdAt,
  updatedAt,
  details,
} = jsonSchema.definitions.Book.properties;

export const bookCreatePropsSchema = {
  type: "object",
  properties: {
    name,
    abstract,
    language: { ...language, nullable: true },
    timeRequired: { ...timeRequired, nullable: true },
    shared: { ...shared, nullable: true },
    sections: {
      type: "array",
      items: sectionPropsSchema,
    },
  },
};

export const bookSchema = {
  type: "object",
  properties: {
    id,
    name,
    abstract,
    language,
    timeRequired,
    shared,
    publishedAt,
    createdAt,
    updatedAt,
    details,
    author: userSchema,
    sections: {
      type: "array",
      items: sectionSchema,
    },
    ltiResourceLinks: {
      type: "array",
      items: ltiResourceLinkSchema,
    },
  },
};
