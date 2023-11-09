import { Box } from "@mui/material";
import Tag from "$atoms/Tag";
import TagMenu from "$atoms/TagMenu";
import useBookmarkHandler from "$utils/bookmark/useBookmarkHandler";
import type {
  BookmarkSchema,
  BookmarkTagMenu,
  TagSchema,
} from "$server/models/bookmark";
import { useCallback, useState } from "react";

type Props = {
  topicId: number;
  bookmarks: BookmarkSchema[];
  tagMenu: BookmarkTagMenu;
};

export default function TagList({ topicId, bookmarks, tagMenu }: Props) {
  const handlers = useBookmarkHandler();
  const [selectedTag, setSelectedTag] = useState<TagSchema[]>(
    bookmarks.map((bookmark) => bookmark.tag)
  );
  const handleTagChange = useCallback((tag: TagSchema) => {
    setSelectedTag((prev) => [...prev, tag]);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        width: "100%",
        margin: "4px 0px",
        padding: "4px 8px",
        borderRadius: "8px",
        textAlign: "left",
        background: "#F9FAFB",
        border: "1px solid #F9FAFB",
      }}
    >
      {selectedTag.map((tag) => {
        const bookmark = bookmarks.find(
          (bookmark) => bookmark.tag.id === tag.id
        );
        if (!bookmark) {
          return null;
        }
        return (
          <Tag
            key={tag.id}
            topicId={topicId}
            bookmark={bookmark}
            {...handlers}
          />
        );
      })}
      <TagMenu
        topicId={topicId}
        selectedTag={selectedTag}
        tagMenu={tagMenu}
        handleTagChange={handleTagChange}
        {...handlers}
      />
    </Box>
  );
}
