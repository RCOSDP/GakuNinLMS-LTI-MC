import prisma from "$server/utils/prisma";

export async function findZoomMeeting(uuid: string) {
  return await prisma.zoomMeeting.findFirst({ where: { uuid } });
}
