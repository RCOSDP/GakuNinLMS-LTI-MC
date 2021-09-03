import prisma from "$server/utils/prisma";

export async function findResourceByImportedId(importedId: string) {
  return await prisma.resource.findFirst({ where: { importedId } });
}
