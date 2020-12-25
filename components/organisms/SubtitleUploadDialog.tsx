import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useForm, Controller } from "react-hook-form";
import TextField from "$atoms/TextField";
import useCardStyles from "$styles/card";
import { VideoTrackProps } from "$server/models/videoTrack";
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

export default function TopicPreviewDialog(props: Props) {
  const classes = useStyles();
  const { open, onClose, onSubmit = () => undefined } = props;
  const cardClasses = useCardStyles();
  const defaultValues = {
    language: Object.getOwnPropertyNames(languages)[0],
    content: "",
  };
  const { handleSubmit, register, control } = useForm<VideoTrackProps>({
    defaultValues,
  });
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        classes: cardClasses,
        component: "form",
        onSubmit: handleSubmit((values) => {
          onSubmit({ ...defaultValues, ...values });
        }),
      }}
    >
      <DialogTitle>字幕のアップロード</DialogTitle>
      <DialogContent className={classes.margin}>
        <TextField
          name="content"
          label="字幕ファイル"
          type="file"
          inputRef={register}
        />
        <Controller
          name="language"
          control={control}
          defaultValue={defaultValues.language}
          render={(props) => (
            <TextField label="言語" select inputProps={props}>
              {Object.entries(languages).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Button variant="contained" color="primary" type="submit">
          アップロード
        </Button>
      </DialogContent>
    </Dialog>
  );
}
