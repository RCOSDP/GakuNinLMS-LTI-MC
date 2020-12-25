import { useState } from "react";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import TextField from "$atoms/TextField";
import SubtitleChip from "$atoms/SubtitleChip";
import SubtitleUploadDialog from "$organisms/SubtitleUploadDialog";
import Video from "$organisms/Video";
import useCardStyles from "styles/card";
import useInputLabelStyles from "styles/inputLabel";
import gray from "theme/colors/gray";
import { TopicProps, TopicSchema } from "$server/models/topic";
import { VideoTrackProps, VideoTrackSchema } from "$server/models/videoTrack";
import languages from "$utils/languages";

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
  subtitles: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
}));

type Props = {
  topic: TopicSchema | null;
  className?: string;
  submitLabel?: string;
  onSubmit?: (topic: TopicProps) => void;
  onDeleteSubtitle: (videoTrack: VideoTrackSchema) => void;
  onSubmitSubtitle: (videoTrack: VideoTrackProps) => void;
};

export default function TopicForm(props: Props) {
  const {
    topic,
    className,
    submitLabel = "更新",
    onSubmit = () => undefined,
    onDeleteSubtitle,
    onSubmitSubtitle,
  } = props;
  const cardClasses = useCardStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickSubtitle = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitSubtitle = (videoTrack: VideoTrackProps) => {
    onSubmitSubtitle(videoTrack);
  };
  const defaultValues = {
    name: topic?.name,
    description: topic?.description ?? "",
    shared: topic?.shared ?? true,
    language: topic?.language ?? Object.getOwnPropertyNames(languages)[0],
    timeRequired: topic?.timeRequired,
    resource: topic?.resource,
  };
  const { handleSubmit, register, control } = useForm<TopicProps>({
    defaultValues,
  });
  return (
    <Card
      classes={cardClasses}
      className={`${classes.margin} ${className}`}
      component="form"
      onSubmit={handleSubmit((values) => {
        onSubmit({ ...defaultValues, ...values });
      })}
    >
      <TextField
        name="name"
        inputRef={register}
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
        defaultValue={topic?.name}
        required
        fullWidth
      />
      <div>
        <InputLabel classes={inputLabelClasses} htmlFor="shared">
          他の編集者に共有
        </InputLabel>
        <Checkbox
          id="shared"
          name="shared"
          inputRef={register}
          defaultChecked={defaultValues.shared}
          color="primary"
        />
      </div>
      <TextField
        id="contentURL"
        label={
          <>
            動画のURL
            <Typography
              className={classes.labelDescription}
              variant="caption"
              component="span"
            >
              YouTube, Vimeo, Wowzaに対応しています
            </Typography>
          </>
        }
        defaultValue={topic?.resource.url}
        required
        fullWidth
      />
      {topic && "tracks" in topic.resource && <Video {...topic.resource} />}
      <Controller
        name="language"
        control={control}
        defaultValue={defaultValues.language}
        render={(props) => (
          <TextField label="教材の主要な言語" select inputProps={props}>
            {Object.entries(languages).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <TextField
        name="timeRequired"
        label="学習時間 (秒)"
        type="number"
        inputProps={{
          ref: register({
            setValueAs: (value) => (value === "" ? null : +value),
            min: 0,
          }),
          min: 0,
        }}
      />
      <div>
        <InputLabel classes={inputLabelClasses}>字幕</InputLabel>
        <div className={classes.subtitles}>
          {topic &&
            "tracks" in topic.resource &&
            topic.resource.tracks.map((track) => (
              <SubtitleChip
                key={track.id}
                videoTrack={track}
                onDelete={onDeleteSubtitle}
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
        <SubtitleUploadDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmitSubtitle}
        />
      </div>
      <TextField
        label="解説"
        fullWidth
        multiline
        name="description"
        inputRef={register}
      />
      <Button variant="contained" color="primary" type="submit">
        {submitLabel}
      </Button>
    </Card>
  );
}
