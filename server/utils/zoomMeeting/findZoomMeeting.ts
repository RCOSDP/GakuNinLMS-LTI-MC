import prisma from "$server/utils/prisma";

export async function findZoomMeeting(id: number) {
  return await prisma.zoomMeeting.findFirst({ where: { id } });
}
