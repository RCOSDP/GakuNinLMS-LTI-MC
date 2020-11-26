import dotenv from "dotenv";
import prisma from "$server/utils/prisma";
import users from "$server/config/seeds/users";
import books from "$server/config/seeds/books";
import { upsertUser } from "$server/utils/user";
import { createBook } from "$server/utils/book";

dotenv.config();

async function main() {
  console.log("Seeding...");

  try {
    const createdUsers = await Promise.all(users.map(upsertUser));

    await Promise.all(
      books
        .map((book) => ({ ...book, authorId: createdUsers[0].id }))
        .map(createBook)
    );
  } catch (error) {
    console.error(error.stack ?? error.message);
  }

  await prisma.$disconnect();

  console.log("Completed.");
  process.exit();
}

main();
