import { mutate } from "swr";

import { api } from "../api";
import type { BookmarkProps, BookmarkSchema } from "$server/models/bookmark";
import { useCallback } from "react";
import type { BookmarkParams } from "$server/validators/bookmarkParams";

const key = "/api/v2/bookmark";

async function createBookmark(body: BookmarkProps): Promise<BookmarkSchema> {
  const res = await api.apiV2BookmarkPost({ body });
  await mutate({ key, topicId: body.topicId, isAllUsers: false }, res);
  return res as unknown as BookmarkSchema;
}

async function deleteBookmark(
  id: BookmarkParams["id"],
  topicId: BookmarkProps["topicId"]
): Promise<void> {
  const res = await api.apiV2BookmarkIdDelete({ id });
  await mutate({ key, topicId, isAllUsers: false }, res);
}

function useBookmarkHandler() {
  const onSubmitBookmark = useCallback(async (body: BookmarkProps) => {
    await createBookmark(body);
  }, []);

  const onDeleteBookmark = useCallback(
    async (id: BookmarkParams["id"], topicId: BookmarkProps["topicId"]) => {
      await deleteBookmark(id, topicId);
    },
    []
  );

  const handlers = {
    onSubmitBookmark,
    onDeleteBookmark,
  };

  return handlers;
}

export default useBookmarkHandler;
