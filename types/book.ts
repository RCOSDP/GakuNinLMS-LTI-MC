import type * as Prisma from "@prisma/client";

export type Book = Pick<Prisma.Book, "id" | "name"> & {
  sections: Section[];
};

export type Section = Pick<Prisma.Section, "id" | "name"> & {
  topics: Topic[];
};

export type Topic = Prisma.Topic & {
  resource: Resource;
};

export type Resource = Prisma.Resource;
