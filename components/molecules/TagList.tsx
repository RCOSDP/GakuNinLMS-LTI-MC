import { Box } from "@mui/material";
import TagWithDeleteButton from "$atoms/TagWithDeleteButton";
import TagMenu from "$atoms/TagMenu";
import useBookmarkHandler from "$utils/bookmark/useBookmarkHandler";
import type {
  BookmarkSchema,
  BookmarkTagMenu,
  TagSchema,
} from "$server/models/bookmark";
import { useCallback, useState } from "react";
import IconButton from "$atoms/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

type Props = {
  topicId: number;
  bookmarks: BookmarkSchema[];
  tagMenu: BookmarkTagMenu;
};

export default function TagList({ topicId, bookmarks, tagMenu }: Props) {
  const handlers = useBookmarkHandler();
  const [selectedTag, setSelectedTag] = useState<TagSchema[]>(
    bookmarks
      .map((bookmark) => bookmark.tag)
      .filter((tag) => tag !== null) as TagSchema[]
  );
  const handleTagChange = useCallback((tag: TagSchema) => {
    setSelectedTag((prev) => [...prev, tag]);
  }, []);

  const isBookmarkMemoContent = bookmarks.some(
    (bookmark) => bookmark.tag === null
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
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
          (bookmark) => bookmark.tagId === tag.id
        );
        if (!bookmark) {
          return null;
        }
        return (
          <TagWithDeleteButton
            key={tag.id}
            topicId={topicId}
            bookmark={bookmark}
            {...handlers}
          />
        );
      })}
      {bookmarks
        .filter((bookmark) => {
          // bookmark.memoContentが存在する場合(自由記述タグ)は末尾に別途表示する
          return bookmark.tag === null;
        })
        .map((bookmark) => {
          return (
            <TagWithDeleteButton
              key={bookmark.id}
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
        isBookmarkMemoContent={isBookmarkMemoContent}
        {...handlers}
      />
      <IconButton
        tooltipProps={{
          title: "自由記述タグはデータ利用されます。",
        }}
      >
        <QuestionMarkIcon
          sx={{
            fontSize: 16,
            verticalAlign: "middle",
          }}
        />
      </IconButton>
    </Box>
  );
}
