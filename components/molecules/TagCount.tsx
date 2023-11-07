import type { BookmarkSchema } from "$server/models/bookmark";
import useBookmarks from "$utils/useBookmarksByTopicId";
import { css } from "@emotion/css";
import { Box } from "@mui/material";
import { useMemo } from "react";

type Props = {
  topicId: number;
};

const circle = css({
  display: "inline-block",
  borderRadius: "50%",
  width: "12px",
  height: "12px",
});

const text = css({
  fontSize: "10px",
});

export default function TagCount({ topicId }: Props) {
  const { bookmarks } = useBookmarks({ topicId, isAllUsers: true });

  const tagWithCounts = useMemo(() => {
    const tags = bookmarks.flatMap((bookmark) => bookmark.tag);

    const countItems = tags.reduce<
      Record<number, BookmarkSchema["tag"] & { count: number }>
    >((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, count: 0 };
      }
      acc[item.id].count += 1;
      return acc;
    }, {});

    return Object.values(countItems);
  }, [bookmarks]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {tagWithCounts.map((tag) => (
        <Box
          key={tag.id}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginRight: "2px",
          }}
        >
          <span style={{ background: tag.color }} className={circle} />
          {tag.count > 1 && <p className={text}>{"×" + `${tag.count}`}</p>}
        </Box>
      ))}
    </Box>
  );
}
