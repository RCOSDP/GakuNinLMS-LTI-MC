import { Box } from "@mui/material";
import Tag from "$atoms/Tag";
import TagMenu from "$atoms/TagMenu";
import useBookmarkHandler from "$utils/useBookmarkHandler";
import type { TagSchema } from "$server/models/bookmark";
import { useCallback, useState } from "react";

type Props = {
  topicId: number;
  defaultTags: TagSchema[];
};

export default function TagList({ topicId, defaultTags }: Props) {
  const handlers = useBookmarkHandler();
  const [selectedTag, setSelectedTag] = useState<TagSchema[]>(defaultTags);
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
        return <Tag key={tag.id} tag={tag} />;
      })}
      <TagMenu
        topicId={topicId}
        selectedTag={selectedTag}
        handleTagChange={handleTagChange}
        {...handlers}
      />
    </Box>
  );
}
