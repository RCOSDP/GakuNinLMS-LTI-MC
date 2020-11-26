import dotenv from "dotenv";
import prisma from "$server/utils/prisma";
import users from "$server/config/seeds/users";

dotenv.config();

async function main() {
  console.log("Seeding...");

  await Promise.all(
    users.map(({ id, ...user }) =>
      prisma.user.upsert({
        where: { id },
        create: user,
        update: user,
      })
    )
  );

  console.log("Completed.");
}

main().finally(async () => {
  await prisma.$disconnect();
  process.exit();
});
