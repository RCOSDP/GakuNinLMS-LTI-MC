import React from "react";
import { Box } from "@mui/material";

import { css } from "@emotion/css";

import type { BookmarkSchema } from "$server/models/bookmark";
import formatInterval from "$utils/formatInterval";
import DescriptionList from "$atoms/DescriptionList";
import getLocaleDateString from "$utils/getLocaleDateString";
import Tag from "$atoms/Tag";

const bookmarkButton = css({
  textAlign: "left",
  padding: "8px 32px",
  width: "100%",
  // reset button style
  background: "none",
  cursor: "pointer",
  border: "none",
  margin: 0,
});

const bookmarkTitle = css({
  margin: 0,
  fontSize: 16,
});

type Props = {
  bookmark: BookmarkSchema;
};

export default function BookmarkPreview({ bookmark }: Props) {
  // 最新のタグ更新日時を取得
  const latestUpdatedAt = bookmark.topic.bookmarks
    ?.map((bookmark) => bookmark.updatedAt)
    .sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    })[0];

  return (
    <button className={bookmarkButton} onClick={() => console.log("click")}>
      <h5 className={bookmarkTitle}>{bookmark.topic?.name}</h5>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <DescriptionList
          sx={{ mr: 1 }}
          value={[
            {
              key: "学習時間",
              value: formatInterval(0, bookmark.topic.timeRequired * 1000),
            },
          ]}
        />
        <DescriptionList
          sx={{ mr: 1 }}
          value={[
            {
              key: "コース",
              value: bookmark.ltiContext?.title,
            },
          ]}
        />
        <DescriptionList
          sx={{ mr: 1 }}
          value={[
            {
              key: "タグ更新日時",
              value: getLocaleDateString(new Date(latestUpdatedAt), "ja"),
            },
          ]}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        {bookmark.topic.bookmarks.map((bookmark) => (
          <Tag key={bookmark.tag.id} tag={bookmark.tag} />
        ))}
      </Box>
    </button>
  );
}
