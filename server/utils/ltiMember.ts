import prisma from "$server/utils/prisma";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { UserSchema } from "$server/models/user";

export async function upsertLtiMember(
  consumerId: LtiResourceLinkSchema["consumerId"],
  contextId: LtiResourceLinkSchema["contextId"],
  userId: UserSchema["ltiUserId"]
) {
  await prisma.ltiMember.upsert({
    where: {
      consumerId_contextId_userId: {
        consumerId,
        contextId,
        userId,
      },
    },
    update: {
      consumerId,
      contextId,
      userId,
    },
    create: {
      consumerId,
      contextId,
      userId,
    },
  });
}
