import prisma from "./prisma";

export async function upsertLtiConsumer(id: string, secret: string) {
  return prisma.ltiConsumer.upsert({
    where: { id },
    create: { id, secret },
    update: { secret },
  });
}
