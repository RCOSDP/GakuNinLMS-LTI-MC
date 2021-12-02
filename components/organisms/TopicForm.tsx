import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Autocomplete from "$atoms/Autocomplete";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";
import InputLabel from "$atoms/InputLabel";
import TextField from "$atoms/TextField";
import AuthorsInput from "$organisms/AuthorsInput";
import KeywordsInput from "$organisms/KeywordsInput";
import SubtitleChip from "$atoms/SubtitleChip";
import SubtitleUploadDialog from "$organisms/SubtitleUploadDialog";
import Video from "$organisms/Video";
import useCardStyles from "styles/card";
import gray from "theme/colors/gray";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";
import languages from "$utils/languages";
import licenses from "$utils/licenses";
import providers from "$utils/providers";
import useVideoResourceProps from "$utils/useVideoResourceProps";
import type { AuthorSchema } from "$server/models/author";
import type { TopicPropsWithAuthors } from "$types/topicPropsWithAuthors";
import { useAuthorsAtom } from "store/authors";
import { useVideoTrackAtom } from "$store/videoTrack";
import useKeywordsInput from "$utils/useKeywordsInput";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(2.5),
    },
  },
  labelDescription: {
    marginLeft: theme.spacing(0.75),
    color: gray[600],
  },
  divider: {
    margin: theme.spacing(0, -3, 0),
  },
  subtitles: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
}));

const label = {
  create: "作成",
  update: "更新",
} as const;

type Props = {
  topic?: TopicSchema;
  className?: string;
  variant?: "create" | "update";
  onSubmit?(topic: TopicPropsWithAuthors): void;
  onSubtitleSubmit(videoTrack: VideoTrackProps): void;
  onSubtitleDelete(videoTrack: VideoTrackSchema): void;
  onAuthorsUpdate(authors: AuthorSchema[]): void;
  onAuthorSubmit(author: Pick<AuthorSchema, "email">): void;
};

export default function TopicForm(props: Props) {
  const {
    topic,
    className,
    variant = "create",
    onSubmit = () => undefined,
    onSubtitleSubmit,
    onSubtitleDelete,
    onAuthorsUpdate,
    onAuthorSubmit,
  } = props;
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const { videoResource, setUrl } = useVideoResourceProps(topic?.resource);
  const handleResourceUrlChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => setUrl(event.target.value),
    500
  );
  const { videoTracks } = useVideoTrackAtom();
  const [open, setOpen] = useState(false);
  const handleClickSubtitle = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubtitleSubmit = (videoTrack: VideoTrackProps) => {
    onSubtitleSubmit(videoTrack);
    setOpen(false);
  };
  const handleSubtitleDelete = (videoTrack: VideoTrackSchema) => {
    onSubtitleDelete(videoTrack);
  };
  const { updateState: _updateState, ...authorsInputProps } = useAuthorsAtom();
  const keywordsInputProps = useKeywordsInput(topic?.keywords ?? []);
  const defaultValues = {
    name: topic?.name,
    description: topic?.description ?? "",
    shared: Boolean(topic?.shared),
    language: topic?.language ?? Object.getOwnPropertyNames(languages)[0],
    license: topic?.license ?? "",
    timeRequired: topic?.timeRequired,
  };
  const { handleSubmit, register, getValues, setValue } = useForm<
    Omit<TopicProps, "resource">
  >({
    defaultValues,
  });
  const handleDurationChange = useCallback(
    (duration: number) => {
      const { timeRequired } = getValues();
      if (timeRequired > 0) return;
      setValue("timeRequired", Math.floor(duration));
    },
    [getValues, setValue]
  );

  return (
    <>
      <Card
        classes={cardClasses}
        className={clsx(classes.margin, className)}
        component="form"
        onSubmit={handleSubmit((values) => {
          const resource = videoResource ?? { url: "" };
          onSubmit({
            ...values,
            resource,
            authors: authorsInputProps.authors,
            keywords: keywordsInputProps.keywords,
          });
        })}
      >
        <TextField
          inputProps={register("name")}
          label={
            <>
              タイトル
              <Typography
                className={classes.labelDescription}
                variant="caption"
                component="span"
              >
                学習者が学習範囲を簡潔に理解できるタイトルを設定できます
              </Typography>
            </>
          }
          required
          fullWidth
        />
        <AuthorsInput
          {...authorsInputProps}
          onAuthorsUpdate={onAuthorsUpdate}
          onAuthorSubmit={onAuthorSubmit}
        />
        <div>
          <InputLabel htmlFor="shared">他の教員にシェア</InputLabel>
          <Checkbox
            id="shared"
            name="shared"
            onChange={(_, checked) => setValue("shared", checked)}
            defaultChecked={defaultValues.shared}
            color="primary"
          />
        </div>
        <Autocomplete
          id="resource.url"
          freeSolo
          options={[...Object.values(providers)].map(({ baseUrl }) => baseUrl)}
          defaultValue={topic?.resource.url}
          renderInput={({ InputProps, inputProps }) => (
            <TextField
              InputProps={{ ref: InputProps.ref }}
              inputProps={inputProps}
              name="resource.url"
              label={
                <>
                  動画のURL
                  <Typography
                    className={classes.labelDescription}
                    variant="caption"
                    component="span"
                  >
                    {[...Object.values(providers)]
                      .map(({ name }) => name)
                      .join(", ")}
                    に対応しています
                  </Typography>
                </>
              }
              type="url"
              required
              fullWidth
              onChange={handleResourceUrlChange}
            />
          )}
        />
        {videoResource && (
          <Video {...videoResource} onDurationChange={handleDurationChange} />
        )}
        <TextField
          label="教材の主要な言語"
          select
          defaultValue={defaultValues.language}
          inputProps={register("language")}
        >
          {Object.entries(languages).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="学習時間 (秒)"
          type="number"
          inputProps={{
            ...register("timeRequired", { valueAsNumber: true }),
            required: true,
            min: 1,
          }}
        />
        <TextField
          label="ライセンス"
          select
          defaultValue={defaultValues.license}
          inputProps={{ displayEmpty: true, ...register("license") }}
        >
          <MenuItem value="">未設定</MenuItem>
          {Object.entries(licenses).map(([value, { name }]) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <KeywordsInput {...keywordsInputProps} />
        <div>
          <InputLabel>字幕</InputLabel>
          <div className={classes.subtitles}>
            {videoTracks.map((track) => (
              <SubtitleChip
                key={track.id}
                videoTrack={track}
                onDelete={handleSubtitleDelete}
              />
            ))}
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSubtitle}
          >
            字幕を追加
          </Button>
        </div>
        <TextField
          label={
            <>
              解説
              <Typography
                className={classes.labelDescription}
                variant="caption"
                component="span"
              >
                <Link
                  href="https://github.github.com/gfm/"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Flavored Markdown
                </Link>
                に一部準拠しています
              </Typography>
            </>
          }
          fullWidth
          multiline
          inputProps={register("description")}
        />
        <Divider className={classes.divider} />
        <Button variant="contained" color="primary" type="submit">
          {label[variant]}
        </Button>
      </Card>

      <SubtitleUploadDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubtitleSubmit}
      />
    </>
  );
}
