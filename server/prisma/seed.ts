import dotenv from "dotenv";
import prisma from "$server/utils/prisma";
import users from "$server/config/seeds/users";
import topics from "$server/config/seeds/topics";
import books from "$server/config/seeds/books";
import ltiResourceLinks from "$server/config/seeds/ltiResourceLinks";
import { upsertUser } from "$server/utils/user";
import upsertTopic from "$server/utils/topic/upsertTopic";
import createBook from "$server/utils/book/createBook";
import { upsertLtiResourceLink } from "$server/utils/ltiResourceLink";

dotenv.config();

async function main() {
  console.log("Seeding...");

  try {
    const createdUsers = await Promise.all(users.map(upsertUser));
    const authorId = createdUsers[0].id;

    await Promise.all(topics.map((topic) => upsertTopic(authorId, topic)));

    const createdBooks = await Promise.all(
      books.map((book) => createBook(authorId, book))
    );

    await Promise.all(
      ltiResourceLinks
        .map((link) => ({ ...link, bookId: createdBooks[0].id }))
        .map(upsertLtiResourceLink)
    );
  } catch (error) {
    console.error(error.stack ?? error.message);
  }

  await prisma.$disconnect();

  console.log("Completed.");
  process.exit();
}

main();
