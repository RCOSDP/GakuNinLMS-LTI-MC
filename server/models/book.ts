import { Book } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { UserSchema } from "./user";
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

export type BookProps = {
  name: string;
  description?: string;
  language?: string;
  shared?: boolean;
  sections?: SectionProps[];
};

export type BookSchema = Omit<Book, "creatorId"> & {
  creator: UserSchema;
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
    creator: UserSchema,
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
