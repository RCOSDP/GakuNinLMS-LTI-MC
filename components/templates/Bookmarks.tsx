import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { Box, Card, Container, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { css } from "@emotion/css";
import { primary, gray } from "$theme/colors";

import type { BookmarkTagMenu, TagSchema } from "$server/models/bookmark";
import { useBookmarksByTagId } from "$utils/bookmark/useBookmarks";
import formatInterval from "$utils/formatInterval";
import DescriptionList from "$atoms/DescriptionList";
import getLocaleDateString from "$utils/getLocaleDateString";
import Tag from "$atoms/Tag";

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
  padding: "8px 32px",
});

const bookmarkTitle = css({
  margin: 0,
  fontSize: 16,
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
              // 最新のタグ更新日時を取得
              const latestUpdatedAt = bookmark.topic.bookmarks
                ?.map((bookmark) => bookmark.updatedAt)
                .sort((a, b) => {
                  return new Date(b).getTime() - new Date(a).getTime();
                })[0];

              return (
                <li key={bookmark.id} className={bookmarkList}>
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
                          value: formatInterval(
                            0,
                            bookmark.topic.timeRequired * 1000
                          ),
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
                          value: getLocaleDateString(
                            new Date(latestUpdatedAt),
                            "ja"
                          ),
                        },
                      ]}
                    />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    {bookmark.topic.bookmarks.map((bookmark) => (
                      <Tag key={bookmark.tag.id} tag={bookmark.tag} />
                    ))}
                  </Box>
                </li>
              );
            })}
          </ul>
        </Box>
      </Card>
    </Container>
  );
}
