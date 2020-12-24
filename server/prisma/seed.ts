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

async function seed() {
  const createdUsers = await Promise.all(users.map(upsertUser));
  const authorId = createdUsers[0].id;

  await Promise.all(topics.map((topic) => upsertTopic(authorId, topic)));

  const createdBooks = (await Promise.all(
    books.map((book) => createBook(authorId, book))
  )) as BookSchema[];

  await Promise.all(
    ltiResourceLinks
      .map((link) => ({ ...link, bookId: createdBooks[0].id }))
      .map(upsertLtiResourceLink)
  );
}

async function main() {
  dotenv.config();
  let exitCode = 1;
  try {
    console.log("Seeding...");
    await seed();
    console.log("Completed.");
    exitCode = 0;
  } catch (error) {
    console.error(error.stack ?? error.message);
  } finally {
    await prisma.$disconnect();
    process.exit(exitCode);
  }
}

main();
