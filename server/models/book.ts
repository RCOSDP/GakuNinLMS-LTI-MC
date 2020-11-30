import { User, Book, Prisma } from "$prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { SectionProps, SectionSchema, sectionSchema } from "./book/section";

export type BookProps = Omit<
  Prisma.BookCreateWithoutAuthorInput,
  "details" | "sections"
> & {
  authorId: User["id"];
  sections: Array<SectionProps>;
};

export type BookSchema = Book & {
  sections: SectionSchema[];
};

const {
  id,
  name,
  abstract,
  publishedAt,
  createdAt,
  updatedAt,
  details,
} = jsonSchema.definitions.Book.properties;
export const bookSchema = {
  type: "object",
  properties: {
    id,
    name,
    abstract,
    publishedAt,
    createdAt,
    updatedAt,
    details,
    authorId: {
      type: "integer",
    },
    sections: {
      type: "array",
      items: sectionSchema,
    },
  },
};
