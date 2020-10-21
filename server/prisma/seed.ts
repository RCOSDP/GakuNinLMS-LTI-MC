import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");
  // TODO: ここにシード
  console.log("Completed.");
}

main().finally(async () => prisma.$disconnect());
