import prisma from "$server/utils/prisma";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import type { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";
import type { LtiContextSchema } from "$server/models/ltiContext";

export async function getLtiMembers(
  consumerId: LtiResourceLinkSchema["consumerId"],
  contextId: LtiResourceLinkSchema["contextId"]
) {
  return await prisma.ltiMember.findMany({
    where: {
      consumerId,
      contextId,
    },
  });
}

export async function updateLtiMembers(
  consumerId: LtiResourceLinkSchema["consumerId"],
  contextId: LtiResourceLinkSchema["contextId"],
  contextTitle: LtiContextSchema["title"],
  contextLabel: LtiContextSchema["label"],
  members: LtiNrpsContextMemberSchema[]
) {
  const contextInput = {
    id: contextId,
    title: contextTitle || "",
    label: contextLabel || "",
    consumer: { connect: { id: consumerId } },
  };

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
    prisma.ltiContext.upsert({
      where: { consumerId_id: { consumerId, id: contextInput.id } },
      create: contextInput,
      update: contextInput,
    }),
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
