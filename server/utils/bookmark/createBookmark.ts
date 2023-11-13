import type { BookmarkProps } from "$server/models/bookmark";
import type { SessionSchema } from "$server/models/session";
import prisma from "$server/utils/prisma";
import type { Bookmark } from "@prisma/client";

async function createBookmark({
  session,
  bookmark,
}: {
  session: SessionSchema;
  bookmark: BookmarkProps;
}): Promise<Bookmark | undefined> {
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
  });

  if (!created) {
    return;
  }
  return created;
}

export default createBookmark;
