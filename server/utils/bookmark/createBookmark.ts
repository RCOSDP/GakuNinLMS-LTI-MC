import type { BookMarkProps } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { Bookmark } from "@prisma/client";

async function createBookmark(
  bookmark: BookMarkProps
): Promise<Bookmark | undefined> {
  const created = await prisma.bookmark.create({
    data: bookmark,
  });

  if (!created) {
    return;
  }
  return created;
}

export default createBookmark;
