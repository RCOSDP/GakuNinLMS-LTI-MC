import dotenv from "dotenv";

import prisma from "$server/utils/prisma";
import { logger, zoomImport } from "$server/utils/zoomImport";

async function main() {
  dotenv.config();
  let exitCode = 1;
  try {
    logger("INFO", "begin zoom import...");
    await zoomImport();
    exitCode = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    logger("ERROR", e.toString(), e);
  } finally {
    logger("INFO", "end zoom import...");
    await prisma.$disconnect();
    process.exit(exitCode);
  }
}

main();
