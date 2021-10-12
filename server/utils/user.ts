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

export async function findCreatedBooks(
  userId: User["id"],
  sort = "updated",
  page: number,
  perPage: number
): Promise<BookSchema[]> {
  const user = prisma.user.findUnique({ where: { id: userId } });
  const books = await user.createdBooks({
    ...bookIncludingTopicsArg,
    orderBy: makeSortOrderQuery(sort),
    skip: page * perPage,
    take: perPage,
  });

  return books.map(bookToBookSchema);
}

export async function findCreatedTopics(
  userId: User["id"],
  sort = "updated",
  page: number,
  perPage: number
): Promise<TopicSchema[]> {
  const user = prisma.user.findUnique({ where: { id: userId } });
  const topics = await user.createdTopics({
    ...topicsWithResourcesArg,
    orderBy: makeSortOrderQuery(sort),
    skip: page * perPage,
    take: perPage,
  });

  return topics.map(topicToTopicSchema);
}
