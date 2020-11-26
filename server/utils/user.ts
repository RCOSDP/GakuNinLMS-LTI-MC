import { User } from "$prisma/client";
import prisma from "./prisma";

export async function upsertUser(user: Omit<User, "id">) {
  return await prisma.user.upsert({
    where: { ltiUserId: user.ltiUserId },
    create: user,
    update: user,
  });
}
