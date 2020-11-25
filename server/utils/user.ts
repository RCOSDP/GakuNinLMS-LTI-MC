import { User } from "~prisma/client";
import jsonSchema from "~server/prisma/json-schema.json";
import prisma from "./prisma";

const { id, ltiUserId, name } = jsonSchema.definitions.User.properties;

export const schema = {
  type: "object",
  properties: { id, ltiUserId, name },
};

export async function upsertUser(user: Omit<User, "id">) {
  return await prisma.user.upsert({
    where: { ltiUserId: user.ltiUserId },
    create: user,
    update: user,
  });
}
