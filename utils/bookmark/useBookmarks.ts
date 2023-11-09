import { api } from "../api";
import useSWR from "swr";

import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";
import type { BookmarkQuery } from "$server/validators/bookmarkQuery";

const key = "/api/v2/bookmark";

async function fetchBookmarks({
  tagId,
}: {
  key: typeof key;
  tagId: BookmarkQuery["tagId"];
}) {
  const res = await api.apiV2BookmarksGet({ tagId, isAllUsers: false });

  return res as unknown as {
    bookmark: BookmarkSchema[];
    bookmarkTagMenu: BookmarkTagMenu;
  };
}

function useBookmarks(query: BookmarkQuery) {
  const { data, isLoading } = useSWR({ key, ...query }, fetchBookmarks);
  const bookmarks: BookmarkSchema[] = data?.bookmark ?? [];
  const bookmarkTagMenu: BookmarkTagMenu = data?.bookmarkTagMenu ?? [];
  return { bookmarks, bookmarkTagMenu, isLoading };
}

export function useBookmarksByTagId({
  tagId,
}: {
  tagId: Extract<BookmarkQuery, { tagId: number }>["tagId"];
}) {
  return useBookmarks({ tagId, isAllUsers: false });
}

export function useBookmarksByTopicId({
  topicId,
  isAllUsers = false,
}: {
  topicId: Extract<BookmarkQuery, { topicId: number }>["topicId"];
  isAllUsers?: BookmarkQuery["isAllUsers"];
}) {
  return useBookmarks({ topicId, isAllUsers });
}
