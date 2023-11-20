import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";

export const bookmark: BookmarkSchema = {
  id: 42,
  tagId: 4,
  tag: {
    id: 4,
    color: "COLOR",
    label: "お気に入り",
  },
  topicId: 1,
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
