import type { Book } from "@prisma/client";
import { AuthorSchema } from "./author";
import type { SectionProps, SectionSchema } from "./book/section";
import { sectionPropsSchema, sectionSchema } from "./book/section";
import type { LtiResourceLinkSchema } from "./ltiResourceLink";
import { ltiResourceLinkSchema } from "./ltiResourceLink";
import { KeywordSchema } from "./keyword";

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
  keywords: KeywordSchema[];
};

export const bookPropsSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    language: { type: "string", nullable: true },
    shared: { type: "boolean", nullable: true },
    sections: {
      type: "array",
      items: sectionPropsSchema,
    },
  },
} as const;

export const bookSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string" },
    language: { type: "string" },
    timeRequired: { type: "integer", nullable: true },
    shared: { type: "boolean" },
    publishedAt: { type: "string", format: "date-time" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    details: { type: "object" },
    authors: { type: "array", items: AuthorSchema },
    keywords: { type: "array", items: KeywordSchema },
    sections: {
      type: "array",
      items: sectionSchema,
    },
    ltiResourceLinks: {
      type: "array",
      items: ltiResourceLinkSchema,
    },
  },
} as const;
