import dotenv from "dotenv";

import prisma from "$server/utils/prisma";
import { validateSettings, logger } from "$server/utils/zoom/env";
import { zoomImport } from "$server/utils/zoom/import";

async function main() {
  dotenv.config();
  let exitCode = 1;
  if (!validateSettings()) {
    process.exit(exitCode);
    return;
  }

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

void main();
