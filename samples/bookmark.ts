import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";

export const bookmark: BookmarkSchema = {
  id: 42,
  userId: 1,
  tagId: 4,
  tag: {
    id: 4,
    color: "COLOR",
    label: "お気に入り",
  },
  topicId: 1,
  topic: {
    id: 1,
    name: "topic-name",
    timeRequired: 60,
    bookmarks: [
      {
        id: 42,
        updatedAt: "2021-01-01T00:00:00.000Z",
        tag: {
          id: 4,
          color: "COLOR",
          label: "お気に入り",
        },
      },
    ],
  },
  ltiContext: {
    title: "context-title",
    label: "context-label",
    id: "contextId",
  },
};

export const bookmarkTagMenu: BookmarkTagMenu = [
  "重要",
  "難しい",
  "後で見る",
  "お気に入り",
  "高評価",
].map((label, i) => ({
  id: i + 1,
  color: "COLOR",
  label,
}));
