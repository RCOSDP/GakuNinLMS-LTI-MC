import prisma from "$server/utils/prisma";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";

export async function updateLtiMembers(
  consumerId: LtiResourceLinkSchema["consumerId"],
  contextId: LtiResourceLinkSchema["contextId"],
  members: LtiNrpsContextMemberSchema[]
) {
  await prisma.$transaction([
    ...members.map((member) =>
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
      })
    ),
    prisma.ltiMember.deleteMany({
      where: {
        consumerId,
        contextId,
      },
    }),
    prisma.ltiMember.createMany({
      data: members.map((member) => ({
        consumerId,
        contextId,
        userId: member.user_id,
      })),
    }),
  ]);

  const ltiMembers = await prisma.ltiMember.findMany({
    where: {
      consumerId,
      contextId,
    },
  });
  return ltiMembers;
}
