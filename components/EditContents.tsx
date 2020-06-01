import { Contents } from "./contents";
import { ReorderVideos } from "./ReorderVideos";
import { Typography, IconButton, Tooltip, Box, Fab } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "./router";
import { registContents } from "./api";
import { useCallback, FormEvent, useRef, useEffect } from "react";

export function EditContents(props: {
  contents: Contents;
  onEditTitle(title: string): void;
  onVideoDragEnd(source: number, destination: number): void;
  onEditVideo(index: number, title: string): void;
  onDeleteVideo(index: number): void;
}) {
  async function editVideoHandler(index: number) {
    // TODO: promptは標準ではないので他の何らかのインタラクティブな入力方法に変更したい
    const title = prompt(
      "新しいタイトルを入力して下さい",
      props.contents.videos[index].title
    );
    title && props.onEditVideo(index, title);
  }
  const router = useRouter();
  const playHandler = useCallback(async () => {
    // TODO: ヒモ付処理は本来不要にしたい
    await registContents(String(props.contents.id), props.contents.title);
    router.push("/");
  }, [props.contents]);

  // NOTE: onEditTitle
  const titleRef = useRef<HTMLHeadingElement>(document.createElement("h2"));
  useEffect(() => {
    titleRef.current.textContent = props.contents.title;
  }, []);

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
              props.onEditTitle(event.currentTarget.textContent);
          }}
        />
      </Box>
      <ReorderVideos
        videos={props.contents.videos}
        onVideoDragEnd={props.onVideoDragEnd}
        onEditVideo={editVideoHandler}
        onDeleteVideo={props.onDeleteVideo}
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
