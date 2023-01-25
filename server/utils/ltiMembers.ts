import prisma from "$server/utils/prisma";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";

export async function upsertLtiMembers(
  consumerId: LtiResourceLinkSchema["consumerId"],
  contextId: LtiResourceLinkSchema["contextId"],
  members: LtiNrpsContextMemberSchema[]
) {
  const ltiMembers = [];
  for (const member of members) {
    const [_, newLtiMembers] = await prisma.$transaction([
      prisma.user.upsert({
        where: {
          ltiConsumerId_ltiUserId: {
            ltiUserId: member.user_id,
            ltiConsumerId: consumerId,
          },
        },
        update: {
          ltiUserId: member.user_id,
          ltiConsumerId: consumerId,
          name: member?.name,
          email: member?.email,
        },
        create: {
          ltiUserId: member.user_id,
          ltiConsumerId: consumerId,
          name: member?.name || "",
          email: member?.email || "",
        },
      }),
      prisma.ltiMember.upsert({
        where: {
          consumerId_contextId_userId: {
            consumerId,
            contextId,
            userId: member.user_id,
          },
        },
        update: {
          consumerId,
          contextId,
          userId: member.user_id,
        },
        create: {
          consumerId,
          contextId,
          userId: member.user_id,
        },
      }),
    ]);
    ltiMembers.push(newLtiMembers);
  }
  return ltiMembers;
}
