import { useState, useCallback, FormEvent, useRef, useEffect } from "react";
import { reorder } from "./reorder";
import { produce } from "immer";
import { Contents, updateContents, createContents } from "./contents";
import { ReorderVideos } from "./ReorderVideos";
import {
  Typography,
  IconButton,
  Tooltip,
  Box,
  Button,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useRouter } from "./router";
import { AddVideosButton } from "./contents/AddVideosButton";
import { Videos } from "./video";
import { VideosRow } from "./contents/VideosSelectorTable";

export function EditContents(props: { contents: Contents; videos: Videos }) {
  const [contents, setContents] = useState<Contents>(props.contents);
  const titleRef = useRef<HTMLHeadingElement>(document.createElement("h2"));
  useEffect(() => {
    if (props.contents.state === "success") setContents(props.contents);
  }, [props.contents]);
  useEffect(() => {
    setContents((prev: Contents) => {
      if (prev.state === "success" && !prev.title) {
        prev.title = "名称未設定";
        prev.state = "pending";
      }
      titleRef.current.textContent = prev.title;
      return { ...prev };
    });
  }, [titleRef, props.contents, setContents]);

  const router = useRouter();
  const { showMessage } = useSnackbar();
  const saveHandler = useCallback(async () => {
    // NOTE: バリデーション
    if (contents.title === "") {
      // TODO: alert やめたい
      alert("タイトルを入力して下さい");
      return;
    }

    if (contents.id) {
      await updateContents(contents as Required<Contents>);
    } else {
      const id = await createContents(contents);
      if (!id) return;
      router.replace({
        pathname: "/contents",
        query: {
          id,
          action: "edit",
        },
      });
    }
    if (typeof window !== "undefined") {
      window.onbeforeunload = null;
    }
    showMessage(`保存しました`);
    router.push("/contents");
  }, [contents, showMessage, router]);
  const closeHandler = useCallback(() => {
    if (typeof window !== "undefined") {
      window.onbeforeunload = null;
    }
    router.push("/contents");
  }, [router]);
  const previewHandler = useCallback(() => {
    router.push({
      pathname: "/contents",
      query: {
        id: router.query.id,
        action: router.query.action,
        preview: "all",
      },
    });
  }, [router]);

  const editContents = useCallback(
    (dispatch: (c: Contents) => Contents) => {
      setContents(dispatch({ ...contents, state: "pending" }));
      if (typeof window !== "undefined") {
        window.onbeforeunload = function (e: BeforeUnloadEvent) {
          // NOTE: 作成(new)・編集(edit)画面での離脱防止
          const action = new URL(document.location.href).searchParams.get(
            "action"
          );
          if (action && ["new", "edit"].includes(action)) e.returnValue = "";
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
  const editTitleHandler = useCallback(
    (event: FormEvent<HTMLHeadingElement>) => {
      const title = (event.currentTarget.textContent || "")
        .replace(/\s/g, " ")
        .trim();
      event.currentTarget.textContent = title;
      editTitle(title);
    },
    [editTitle]
  );

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
        <Tooltip title="再生する">
          <IconButton
            area-label="play"
            style={{
              marginRight: 16,
              marginBottom: 8,
            }}
            onClick={previewHandler}
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
      <Box mt={2} mb={4} display="flex">
        <Button
          variant="contained"
          size="large"
          startIcon={<CloseIcon />}
          onClick={closeHandler}
          fullWidth
          style={{ margin: 16 }}
        >
          保存せず学習コンテンツ一覧に戻る
        </Button>
        <Button
          type="submit"
          name="submit"
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={saveHandler}
          fullWidth
          style={{ margin: 16 }}
        >
          保存して学習コンテンツ一覧に戻る
        </Button>
      </Box>
    </>
  );
}
