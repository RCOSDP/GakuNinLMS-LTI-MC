import type * as Prisma from "@prisma/client";

export type Book = Pick<Prisma.Book, "name" | "createdAt" | "updatedAt"> & {
  author: Pick<Prisma.User, "name">;
  sections: Section[];
};

export type Section = Pick<Prisma.Section, "name"> & {
  topics: Topic[];
};

export type Topic = Pick<Prisma.Topic, "name">;
