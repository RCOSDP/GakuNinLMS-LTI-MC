import { api } from "../api";
import useSWR from "swr";

import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";
import type { BookmarkQuery } from "$server/validators/bookmarkQuery";

const key = "/api/v2/bookmark";

async function fetchBookmarks({
  topicId,
  isAllUsers,
}: {
  key: typeof key;
  topicId: BookmarkQuery["topicId"];
  isAllUsers: BookmarkQuery["isAllUsers"];
}) {
  const res = await api.apiV2BookmarksGet({ topicId, isAllUsers });

  return res as unknown as {
    bookmark: BookmarkSchema[];
    bookmarkTagMenu: BookmarkTagMenu;
  };
}

function useBookmarksByTopicId({
  topicId,
  isAllUsers = false,
}: {
  topicId: BookmarkQuery["topicId"];
  isAllUsers?: BookmarkQuery["isAllUsers"];
}) {
  const { data, isLoading } = useSWR(
    { key, topicId, isAllUsers },
    fetchBookmarks
  );

  const bookmarkTagMenu: BookmarkTagMenu = data?.bookmarkTagMenu ?? [];

  return { bookmarks: data?.bookmark || [], bookmarkTagMenu, isLoading };
}

export default useBookmarksByTopicId;
