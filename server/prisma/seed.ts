import dotenv from "dotenv";
import prisma from "$server/utils/prisma";
import { BookSchema } from "$server/models/book";
import users from "$server/config/seeds/users";
import topics from "$server/config/seeds/topics";
import books from "$server/config/seeds/books";
import ltiResourceLinks from "$server/config/seeds/ltiResourceLinks";
import { upsertUser } from "$server/utils/user";
import upsertTopic from "$server/utils/topic/upsertTopic";
import createBook from "$server/utils/book/createBook";
import { upsertLtiResourceLink } from "$server/utils/ltiResourceLink";
import { upsertLtiConsumer } from "$server/utils/ltiConsumer";
import { OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET } from "$server/utils/env";

async function seed() {
  const ltiConsumer = await upsertLtiConsumer(
    OAUTH_CONSUMER_KEY,
    OAUTH_CONSUMER_SECRET
  );

  const createdUsers = await Promise.all(
    users
      .map((user) => ({
        ...user,
        ltiConsumerId: ltiConsumer.id,
      }))
      .map(upsertUser)
  );
  const authorId = createdUsers[0].id;

  await Promise.all(topics.map((topic) => upsertTopic(authorId, topic)));

  const createdBooks = (await Promise.all(
    books.map((book) => createBook(authorId, book))
  )) as BookSchema[];

  await Promise.all(
    ltiResourceLinks
      .map((link) => ({
        ...link,
        consumerId: ltiConsumer.id,
        bookId: createdBooks[0].id,
      }))
      .map(upsertLtiResourceLink)
  );
}

async function main() {
  dotenv.config();
  let exitCode = 1;
  try {
    console.log("Seeding...");
    await seed();
    console.log("Seeding completed.");
    exitCode = 0;
  } catch (error) {
    console.error(error.stack ?? error.message);
  } finally {
    await prisma.$disconnect();
    process.exit(exitCode);
  }
}

main();
