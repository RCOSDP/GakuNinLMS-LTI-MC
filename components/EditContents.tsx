import { useState, useCallback, FormEvent, useRef, useEffect } from "react";
import { reorder } from "./reorder";
import { produce } from "immer";
import { Contents, updateContents } from "./contents";
import { ReorderVideos } from "./ReorderVideos";
import { Typography, IconButton, Tooltip, Box } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SaveIcon from "@material-ui/icons/Save";
import { useRouter } from "next/router";
import { registContents } from "./api";
import { AddVideosButton } from "./contents/AddVideosButton";
import { Videos } from "./video";
import { VideosRow } from "./contents/VideosSelectorTable";

export function EditContents(props: { contents: Contents; videos: Videos }) {
  const [contents, setContents] = useState<Contents>(props.contents);
  useEffect(() => {
    if (props.contents.state === "success") setContents(props.contents);
  }, [props.contents.state]);
  const router = useRouter();
  const playHandler = useCallback(async () => {
    // TODO: ヒモ付処理は本来不要にしたい
    if (!contents.id) return;
    await registContents(contents.id, contents.title);
    router.push("/");
  }, [contents]);
  const saveHandler = useCallback(() => {
    if (contents.id) updateContents(contents as Required<Contents>);
    if (typeof window !== "undefined") {
      window.onbeforeunload = null;
    }
  }, [updateContents, contents]);
  const editContents = useCallback(
    (dispatch: (c: Contents) => Contents) => {
      setContents(dispatch({ ...contents, state: "pending" }));
      if (typeof window !== "undefined") {
        window.onbeforeunload = function (e: BeforeUnloadEvent) {
          e.returnValue = "";
        };
      }
    },
    [contents, setContents]
  );
  const editTitle = useCallback(
    (title: string) => {
      editContents((contents) =>
        produce(contents, (draft) => {
          draft.title = title;
        })
      );
    },
    [editContents]
  );
  const titleRef = useRef<HTMLHeadingElement>(document.createElement("h2"));
  const editTitleHandler = useCallback(
    (event: FormEvent<HTMLHeadingElement>) => {
      const title = (event.currentTarget.textContent || "").replace(/\s/g, " ");
      editTitle(title);
    },
    [editTitle]
  );
  useEffect(() => {
    setContents((prev: Contents) => {
      if (prev.state === "success" && !prev.title) {
        prev.title = "名称未設定";
      }
      titleRef.current.textContent = prev.title;
      return { ...prev };
    });
  }, [titleRef, setContents]);

  const reorderVideo = useCallback(
    (source: number, destination: number) => {
      editContents((contents) =>
        produce(contents, (draft) => {
          draft.videos = reorder(draft.videos, source, destination);
        })
      );
    },
    [editContents]
  );
  const editVideoTitle = useCallback(
    (index: number, title: string) => {
      editContents((contents) =>
        produce(contents, (draft) => {
          draft.videos[index].title = title;
        })
      );
    },
    [editContents]
  );
  const deleteVideo = useCallback(
    (index: number) => {
      editContents((contents) =>
        produce(contents, (draft) => {
          draft.videos.splice(index, 1);
        })
      );
    },
    [editContents]
  );
  const addVideo = useCallback(
    (selected: VideosRow[]) => {
      editContents((contents) =>
        produce(contents, (draft) => {
          draft.videos = draft.videos.concat(selected);
        })
      );
    },
    [editContents]
  );
  const editVideoTitleHandler = useCallback(
    (index: number) => {
      // TODO: promptは標準ではないので他の何らかのインタラクティブな入力方法に変更したい
      const title = prompt(
        "新しいタイトルを入力して下さい",
        contents.videos[index].title
      );
      title && editVideoTitle(index, title);
    },
    [editVideoTitle]
  );

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
          onInput={editTitleHandler}
        />
      </Box>
      <ReorderVideos
        videos={contents.videos}
        onVideoDragEnd={reorderVideo}
        onEditVideo={editVideoTitleHandler}
        onDeleteVideo={deleteVideo}
      />
      <Box mt={2} mb={4} textAlign="center">
        <AddVideosButton
          videos={props.videos}
          onOpen={() => {}}
          onClose={addVideo}
        />
      </Box>
    </>
  );
}
