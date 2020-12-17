import type * as Prisma from "@prisma/client";

export type Book = Pick<
  Prisma.Book,
  | "id"
  | "name"
  | "abstract"
  | "language"
  | "timeRequired"
  | "shared"
  | "createdAt"
  | "updatedAt"
> & {
  author: Pick<Prisma.User, "name">;
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
