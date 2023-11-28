import type { BookmarkProps, BookmarkSchema } from "$server/models/bookmark";
import type { SessionSchema } from "$server/models/session";
import prisma from "$server/utils/prisma";

async function createBookmark({
  session,
  bookmark,
}: {
  session: SessionSchema;
  bookmark: BookmarkProps;
}): Promise<BookmarkSchema | undefined> {
  if (!session.ltiResourceLink?.consumerId) {
    return;
  }
  const created = await prisma.bookmark.create({
    data: {
      userId: session.user.id,
      ltiConsumerId: session.ltiResourceLink?.consumerId,
      ltiContextId: session.ltiContext.id,
      ...bookmark,
    },
    include: {
      tag: true,
    },
  });

  if (!created) {
    return;
  }
  return created;
}

export default createBookmark;
