import type { Book } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { AuthorSchema } from "./author";
import type { SectionProps, SectionSchema } from "./book/section";
import { sectionPropsSchema, sectionSchema } from "./book/section";
import type { LtiResourceLinkSchema } from "./ltiResourceLink";
import { ltiResourceLinkSchema } from "./ltiResourceLink";

export type BookProps = {
  name: string;
  description?: string;
  language?: string;
  shared?: boolean;
  sections?: SectionProps[];
};

export type BookSchema = Book & {
  authors: AuthorSchema[];
  sections: SectionSchema[];
  ltiResourceLinks: LtiResourceLinkSchema[];
};

const {
  id,
  name,
  description,
  language,
  shared,
  publishedAt,
  createdAt,
  updatedAt,
  details,
} = jsonSchema.definitions.Book.properties;

export const bookPropsSchema = {
  type: "object",
  properties: {
    name,
    description,
    language: { ...language, nullable: true },
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
    description,
    language,
    timeRequired: { type: "integer", nullable: true },
    shared,
    publishedAt,
    createdAt,
    updatedAt,
    details,
    authors: { type: "array", items: AuthorSchema },
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
