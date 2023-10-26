import { api } from "./api";
import useSWR from "swr";

import type { BookmarkSchema } from "$server/models/bookmark";

const key = "/api/v2/bookmark";

async function fetchBookmarks({
  topicId,
}: {
  key: typeof key;
  topicId: number;
}): Promise<{ bookmark: BookmarkSchema[] }> {
  const res = await api.apiV2BookmarksGet({ topicId });

  return res as unknown as { bookmark: BookmarkSchema[] };
}

function useBookmarks({ topicId }: { topicId: number }) {
  const { data, isLoading } = useSWR({ key, topicId }, fetchBookmarks);
  const tags = data?.bookmark?.map((bookmark) => bookmark.tag) ?? [];

  return { tags, isLoading };
}

export default useBookmarks;
