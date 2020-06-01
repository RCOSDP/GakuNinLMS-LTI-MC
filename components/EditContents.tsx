import { useState, useCallback, FormEvent, useRef, useEffect } from "react";
import { reorder } from "./reorder";
import { produce } from "immer";
import { Contents, updateContents } from "./contents";
import { ReorderVideos } from "./ReorderVideos";
import { Typography, IconButton, Tooltip, Box, Fab } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { useRouter } from "next/router";
import { registContents } from "./api";

export function EditContents(props: {
  contents: Contents;
  updateContents(contents: Required<Contents>): void;
}) {
  const [contents, setContents] = useState<Contents>(props.contents);
  useEffect(() => {
    if (props.contents.state === "success") setContents(props.contents);
  }, [props.contents.state]);

  function onVideoDragEnd(source: number, destination: number) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.videos = reorder(draft.videos, source, destination);
      })
    );
  }
  function onEditVideo(index: number, title: string) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.videos[index].title = title;
      })
    );
  }
  function onDeleteVideo(index: number) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.videos.splice(index, 1);
      })
    );
  }
  function onEditTitle(title: string) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.title = title;
      })
    );
  }

  async function editVideoHandler(index: number) {
    // TODO: promptは標準ではないので他の何らかのインタラクティブな入力方法に変更したい
    const title = prompt(
      "新しいタイトルを入力して下さい",
      contents.videos[index].title
    );
    title && onEditVideo(index, title);
  }
  const router = useRouter();
  const playHandler = useCallback(async () => {
    // TODO: ヒモ付処理は本来不要にしたい
    await registContents(String(contents.id), contents.title);
    router.push("/");
  }, [contents]);

  const saveHandler = useCallback(() => {
    if (contents.id) updateContents(contents as Required<Contents>);
  }, [updateContents, contents]);

  // NOTE: onEditTitle
  const titleRef = useRef<HTMLHeadingElement>(document.createElement("h2"));
  useEffect(() => {
    titleRef.current.textContent = contents.title;
  }, [titleRef, contents.title]);

  return (
    <>
      <Box my={2}>
        <Tooltip title="保存する">
          <IconButton
            area-label="save"
            style={{
              marginBottom: 8,
            }}
            onClick={saveHandler}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="再生する">
          <IconButton
            area-label="play"
            style={{
              marginRight: 16,
              marginBottom: 8,
            }}
            onClick={playHandler}
          >
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
        <Typography
          ref={titleRef}
          component="h2"
          variant="h5"
          style={{
            display: "inline",
          }}
          contentEditable
          onInput={(event: FormEvent<HTMLHeadingElement>) => {
            if (event.currentTarget.textContent)
              onEditTitle(event.currentTarget.textContent);
          }}
        />
      </Box>
      <ReorderVideos
        videos={contents.videos}
        onVideoDragEnd={onVideoDragEnd}
        onEditVideo={editVideoHandler}
        onDeleteVideo={onDeleteVideo}
      />
      <Box mt={2} textAlign="center">
        <Tooltip title="ビデオを追加する">
          <Fab aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
}
