import { useEffect, useState, useCallback, FormEvent } from "react";
import { useSnackbar } from "material-ui-snackbar-provider";
import { produce } from "immer";
import ISO6391 from "iso-639-1";
import { Player } from "./Player";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Box from "@material-ui/core/Box";
import { Subtitle } from "./video/subtitle";
import { useRouter } from "./router";
import { Video, updateVideo, createVideo } from "./video";

const iso6391 = ISO6391.getLanguages(ISO6391.getAllCodes());

export function EditVideo(props: { video: Video }) {
  const [video, setVideo] = useState<Video>(props.video);
  useEffect(() => {
    setVideo((prev: Video) => {
      if (prev.state === "success" && !prev.title) {
        prev.title = "名称未設定";
        prev.state = "pending";
      }
      return { ...prev };
    });
  }, [props.video, setVideo]);

  const router = useRouter();
  const { showMessage } = useSnackbar();
  const saveHandler = useCallback(async () => {
    if (video.id) {
      await updateVideo(video as Required<Video>);
    } else {
      const id = await createVideo(video);
      if (!id) return;
      router.push({
        pathname: "/videos",
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
  }, [video, showMessage, router]);

  const edit = useCallback(
    (dispatch: (v: Video) => Video) => {
      setVideo(dispatch({ ...video, state: "pending" }));
      if (typeof window === "undefined") return;
      window.onbeforeunload = function (e: BeforeUnloadEvent) {
        // NOTE: 作成(new)・編集(edit)画面での離脱防止
        const action = new URL(document.location.href).searchParams.get(
          "action"
        );
        if (action && ["new", "edit"].includes(action)) e.returnValue = "";
      };
    },
    [video, setVideo]
  );
  const inputHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const form = new FormData(event.currentTarget);
      edit((video) =>
        produce(video, (draft) => {
          draft.title = form.get("title") as string;
          draft.description = form.get("description") as string;
          draft.youtubeVideoId = form.get("youtubeVideoId") as string;
          draft.skills = draft.skills.map(({ id, name }) => ({
            id,
            name,
            has: Boolean(form.get(`skill-${id}`)),
          }));
          draft.tasks = draft.tasks.map(({ id, name }) => ({
            id,
            name,
            has: Boolean(form.get(`task-${id}`)),
          }));
          draft.levels = draft.levels.map(({ id, name }) => ({
            id,
            name,
            has: Boolean(form.get(`level-${id}`)),
          }));
          const uploadSubtitleLang =
            (form.get("upload-subtitle-lang") as string) || "und";
          const uploadSubtitleFile = form.get("upload-subtitle-file") as
            | File
            | undefined;
          if (uploadSubtitleFile && uploadSubtitleLang !== "und") {
            draft.subtitles.push({
              lang: uploadSubtitleLang,
              file: uploadSubtitleFile,
            });
            const subtitles: Map<
              Subtitle["lang"],
              { file: File }
            > = draft.subtitles.reduce(
              (prev, { lang, file }) => prev.set(lang, { file }),
              new Map()
            );
            draft.subtitles = [];
            Array.from(subtitles).forEach(([lang, sub]) =>
              draft.subtitles.push({ lang, ...sub })
            );
          }
          console.log(video.subtitles);
        })
      );
    },
    [edit]
  );
  const submitHandler = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      saveHandler();
    },
    [saveHandler]
  );

  return (
    <form onInput={inputHandler} onSubmit={submitHandler}>
      <Box my={2}>
        <TextField
          name="title"
          label="タイトル"
          value={video.title}
          required
          fullWidth
          color="secondary"
        />
      </Box>
      <Box my={2}>
        <Box my={1}>
          <Player youtubeVideoId={video.youtubeVideoId} />
        </Box>
        <TextField
          name="youtubeVideoId"
          label="YouTube Video ID"
          value={video.youtubeVideoId}
          variant="filled"
          required
          fullWidth
          color="secondary"
        />
      </Box>
      <TextField
        name="description"
        label="概要"
        value={video.description}
        variant="outlined"
        multiline
        rows={5}
        fullWidth
        color="secondary"
      />
      <Box my={2}>
        <Box m={1}>
          <FormControl component="fieldset" color="secondary">
            <FormLabel component="legend">スキル</FormLabel>
            <FormGroup row>
              {video.skills.map(({ id, name, has }) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      name={`skill-${id}`}
                      value
                      // FIXME: Use a controlled
                      defaultChecked={has}
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box m={1}>
          <FormControl component="fieldset" color="secondary">
            <FormLabel component="legend">職種</FormLabel>
            <FormGroup row>
              {video.tasks.map(({ id, name, has }) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      name={`task-${id}`}
                      value
                      // FIXME: Use a controlled
                      defaultChecked={has}
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box m={1}>
          <FormControl component="fieldset" color="secondary">
            <FormLabel component="legend">レベル</FormLabel>
            <FormGroup row>
              {video.levels.map(({ id, name, has }) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      name={`level-${id}`}
                      value
                      // FIXME: Use a controlled
                      defaultChecked={has}
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
        <Box my={2}>
          <Box my={1}>
            <TextField
              select
              label="追加する字幕の言語"
              name="upload-subtitle-lang"
              defaultValue="und"
              variant="filled"
              fullWidth
              color="secondary"
            >
              <MenuItem value="und">未選択</MenuItem>
              {iso6391.map(({ code, nativeName }) => (
                <MenuItem key={code} value={code}>
                  {nativeName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <input type="file" name="upload-subtitle-file" />
        </Box>
      </Box>
      <Box mt={2} mb={4}>
        <Button
          type="submit"
          name="submit"
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          fullWidth
        >
          保存する
        </Button>
      </Box>
    </form>
  );
}
