import type { User } from "@prisma/client";
import type { UserProps } from "$server/models/user";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import prisma from "./prisma";
import makeSortOrderQuery from "./makeSortOrderQuery";
import {
  bookIncludingTopicsArg,
  bookToBookSchema,
} from "./book/bookToBookSchema";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "./topic/topicToTopicSchema";

export async function upsertUser({ ltiConsumerId, ...user }: UserProps) {
  return await prisma.user.upsert({
    where: {
      ltiConsumerId_ltiUserId: {
        ltiConsumerId: ltiConsumerId,
        ltiUserId: user.ltiUserId,
      },
    },
    create: {
      ...user,
      ltiConsumer: { connect: { id: ltiConsumerId } },
    },
    update: user,
  });
}

export async function findUsersByEmail(email: User["email"]) {
  return await prisma.user.findMany({ where: { email } });
}

export async function findBooksBy(
  by: User["id"],
  sort = "updated",
  page: number,
  perPage: number
): Promise<BookSchema[]> {
  const authorship = await prisma.authorship.findMany({
    where: { userId: by },
    include: {
      book: bookIncludingTopicsArg,
    },
    orderBy: {
      book: makeSortOrderQuery(sort),
    },
    skip: page * perPage,
    take: perPage,
  });

  return authorship.flatMap(({ book }) =>
    book == null ? [] : [bookToBookSchema(book)]
  );
}

export async function findTopicsBy(
  by: User["id"],
  sort = "updated",
  page: number,
  perPage: number
): Promise<TopicSchema[]> {
  const authorship = await prisma.authorship.findMany({
    where: { userId: by },
    include: {
      topic: topicsWithResourcesArg,
    },
    orderBy: {
      topic: makeSortOrderQuery(sort),
    },
    skip: page * perPage,
    take: perPage,
  });

  return authorship.flatMap(({ topic }) =>
    topic == null ? [] : [topicToTopicSchema(topic)]
  );
}
