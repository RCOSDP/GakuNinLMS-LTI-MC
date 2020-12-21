import type * as Prisma from "@prisma/client";
import { BookProps } from "$server/models/book";
import { LtiResourceLinkProps } from "$server/models/ltiResourceLink";

export type Book = Omit<BookProps, "sections"> & {
  id: number;
  author: Pick<Prisma.User, "name">;
  ltiResourceLinks: LtiResourceLinkProps[];
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
