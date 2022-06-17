import prisma from "$server/utils/prisma";

export async function findNewZoomBook(zoomMeetingId: number) {
  return await prisma.book.findFirst({
    where: { zoomMeetingId },
    orderBy: { id: "desc" },
    include: { publicBooks: true },
  });
}
