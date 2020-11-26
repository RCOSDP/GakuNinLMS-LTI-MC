import { UserProps } from "$server/models/user";
import prisma from "./prisma";

export async function upsertUser(user: UserProps) {
  return await prisma.user.upsert({
    where: { ltiUserId: user.ltiUserId },
    create: user,
    update: user,
  });
}
