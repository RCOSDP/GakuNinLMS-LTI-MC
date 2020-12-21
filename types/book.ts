import type * as Prisma from "@prisma/client";
import { BookSchema } from "$server/models/book";

export type Book = Omit<BookSchema, "sections"> & {
  sections: Section[];
};

export type Section = Pick<Prisma.Section, "id" | "name"> & {
  topics: Topic[];
};

export type Topic = Omit<Prisma.Topic, "creatorId" | "language" | "shared"> & {
  creator: { id: number; name: string };
  resource: Resource;
};

export type Resource = Prisma.Resource;
