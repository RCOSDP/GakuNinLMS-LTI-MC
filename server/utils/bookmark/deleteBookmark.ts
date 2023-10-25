import type { BookmarkSchema } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { Bookmark } from "@prisma/client";

async function deleteBookmark({
  id,
}: {
  id: BookmarkSchema["id"];
}): Promise<Bookmark | undefined> {
  const created = await prisma.bookmark.delete({
    where: { id },
  });

  if (!created) {
    return;
  }
  return created;
}

export default deleteBookmark;
