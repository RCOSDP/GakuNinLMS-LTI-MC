import type * as Prisma from "@prisma/client";

export type Book = Pick<
  Prisma.Book,
  "id" | "name" | "createdAt" | "updatedAt"
> & {
  author: Pick<Prisma.User, "name">;
  sections: Section[];
};

export type Section = Pick<Prisma.Section, "id" | "name"> & {
  topics: Topic[];
};

export type Topic = Pick<Prisma.Topic, "id" | "name">;
