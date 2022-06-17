import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import makeStyles from "@mui/styles/makeStyles";
import { useForm } from "react-hook-form";
import TextField from "$atoms/TextField";
import useCardStyles from "$styles/card";
import type { VideoTrackProps } from "$server/models/videoTrack";
import languages from "$utils/languages";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  input: {
    "& > *": {
      height: "unset",
    },
  },
}));

type Props = {
  open: boolean;
  onClose: React.MouseEventHandler;
  onSubmit?(videoTrack: VideoTrackProps): void;
};

export default function SubtitleUploadDialog(props: Props) {
  const classes = useStyles();
  const { open, onClose, onSubmit = () => undefined } = props;
  const cardClasses = useCardStyles();
  const defaultValues = {
    language: Object.getOwnPropertyNames(languages)[0],
    content: "",
  };
  const { handleSubmit, register } = useForm<
    VideoTrackProps & { contentFile?: FileList }
  >({
    defaultValues,
  });
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        classes: cardClasses,
      }}
    >
      <form
        onSubmit={handleSubmit(({ contentFile, ...values }) => {
          const content = contentFile?.[0] ?? defaultValues.content;
          onSubmit({ ...values, content });
        })}
      >
        <DialogTitle>字幕のアップロード</DialogTitle>
        <DialogContent className={classes.margin}>
          <TextField
            label="字幕ファイル"
            type="file"
            inputProps={register("contentFile")}
          />
          <TextField
            label="言語"
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
          <Button variant="contained" color="primary" type="submit">
            アップロード
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
