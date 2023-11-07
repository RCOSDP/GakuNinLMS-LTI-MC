import { api } from "./api";
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

function useBookmarksByTagId({ tagId }: { tagId: BookmarkQuery["tagId"] }) {
  const { data, isLoading } = useSWR({ key, tagId }, fetchBookmarks);

  const bookmarkTagMenu: BookmarkTagMenu = data?.bookmarkTagMenu ?? [];

  return { bookmarks: data?.bookmark || [], bookmarkTagMenu, isLoading };
}

export default useBookmarksByTagId;
