import { mutate } from "swr";

import { api } from "./api";
import type { BookmarkProps, BookmarkSchema } from "$server/models/bookmark";
import { useCallback } from "react";

const key = "/api/v2/bookmark";

async function createBookmark(body: BookmarkProps): Promise<BookmarkSchema> {
  const res = await api.apiV2BookmarkPost({ body });
  await mutate({ key, topicId: body.topicId }, res);
  return res as unknown as BookmarkSchema;
}

function useBookmarkHandler() {
  const onSubmitBookmark = useCallback(async (body: BookmarkProps) => {
    await createBookmark(body);
  }, []);

  const handlers = {
    onSubmitBookmark,
  };

  return handlers;
}

export default useBookmarkHandler;
