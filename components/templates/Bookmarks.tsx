import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { Box, Card, Container, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { css } from "@emotion/css";
import { primary, gray } from "$theme/colors";

import type { BookmarkTagMenu, TagSchema } from "$server/models/bookmark";
import { useBookmarksByTagId } from "$utils/bookmark/useBookmarks";
// import useDialogProps from "$utils/useDialogProps";
// import type { ContentSchema } from "$server/models/content";
// import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import BookmarkPreview from "$organisms/BookmarkPreview";

const title = css({
  fontSize: 32,
  marginBottom: 32,
});

const card = css({
  border: `1px solid ${gray[300]}`,
  borderRadius: 12,
  boxShadow: "none",
});

const header = css({
  padding: "8px 16px 8px 16px",
  borderBottom: `1px solid ${gray[300]}`,
  display: "flex",
  alignItems: "center",
  gap: 16,
});

const listWrap = css({
  margin: 0,
  padding: 0,
  display: "flex",
  gap: 8,
});

const body = css({
  backgroundColor: "#FFF",
});

const list = css({
  listStyle: "none",
});

const button = css({
  display: "inline-block",
  background: "none",
  cursor: "pointer",
  border: `1px solid ${primary[400]}`,
  color: primary[400],
  borderRadius: 4,
  padding: "8px 16px",
  height: "36px",
});

const disabledButton = css({
  background: gray[100],
  color: gray[700],
  border: `1px solid ${gray[300]}`,
});

const checkIcon = css({
  fontSize: "12px",
  marginRight: 8,
  lineHeight: 1.1,
});

const bookmarkWrap = css({
  margin: "8px 0",
  padding: 0,
});

const bookmarkList = css({
  listStyle: "none",
  borderBottom: `1px solid ${gray[300]}`,
});

type Props = {
  bookmarkTagMenu: BookmarkTagMenu;
};

function isSelectedTagMenu(
  targetTagId: TagSchema["id"],
  selectedTagMenu: BookmarkTagMenu
) {
  return selectedTagMenu.some((tag) => tag.id === targetTagId);
}

export default function Bookmarks({ bookmarkTagMenu }: Props) {
  const [selectedTagMenu, setSelectedTagMenu] =
    useState<BookmarkTagMenu>(bookmarkTagMenu);
  const onClickTagMenu = useCallback(
    (tag: TagSchema) => {
      if (isSelectedTagMenu(tag.id, selectedTagMenu)) {
        setSelectedTagMenu((prev) =>
          prev.filter((selectedTag) => selectedTag.id !== tag.id)
        );
      } else {
        setSelectedTagMenu((prev) => [...prev, tag]);
      }
    },
    [selectedTagMenu]
  );

  const data = useBookmarksByTagId({
    tagIds: String(
      new URLSearchParams(
        selectedTagMenu.map((tag) => ["tagIds", tag.id.toString()])
      )
    ),
  });

  // const {
  //   data: previewContent,
  //   dispatch: handlePreviewClick,
  //   ...dialogProps
  // } = useDialogProps<ContentSchema>();

  return (
    <Container sx={{ mt: 5, gridArea: "title" }} maxWidth="md">
      <Typography variant="h4" className={title}>
        タグ管理
      </Typography>
      <Card className={card}>
        <Box className={header}>
          <ul className={listWrap}>
            {bookmarkTagMenu.map((tag) => {
              return (
                <li key={tag.id} className={list}>
                  <button
                    className={clsx(button, {
                      [disabledButton]: !isSelectedTagMenu(
                        tag.id,
                        selectedTagMenu
                      ),
                    })}
                    onClick={() => onClickTagMenu(tag)}
                  >
                    <CheckIcon className={checkIcon} />
                    {tag.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </Box>
        <Box className={body}>
          <ul className={bookmarkWrap}>
            {data.bookmarks.map((bookmark) => {
              return (
                <li key={bookmark.id} className={bookmarkList}>
                  <BookmarkPreview bookmark={bookmark} />
                </li>
              );
            })}
          </ul>
        </Box>
      </Card>
      {/* {previewContent?.type === "topic" && (
        <TopicPreviewDialog {...dialogProps} topic={previewContent} />
      )} */}
    </Container>
  );
}
