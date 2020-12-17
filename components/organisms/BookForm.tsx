import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import useInputLabelStyles from "styles/inputLabel";
import gray from "theme/colors/gray";
import { BookProps } from "$server/models/book";
import { Book } from "types/book";

const languages = [
  {
    value: "ja",
    label: "日本語",
  },
  {
    value: "en",
    label: "英語",
  },
] as const;

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:first-child)": {
      marginTop: theme.spacing(2.5),
    },
  },
  labelDescription: {
    marginLeft: theme.spacing(0.75),
    color: gray[600],
  },
}));

type Props = {
  book: Book | null;
  submitLabel?: string;
  onSubmit?: (book: BookProps) => void;
};

export default function BookForm(props: Props) {
  const { book, submitLabel = "更新", onSubmit = () => undefined } = props;
  const cardClasses = useCardStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const { handleSubmit, control } = useForm<BookProps>();

  return (
    <Card
      classes={cardClasses}
      className={classes.margin}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        defaultValue={book?.name}
        render={(props) => (
          <TextField
            label={
              <span>
                タイトル
                <Typography
                  className={classes.labelDescription}
                  variant="caption"
                  component="span"
                >
                  学習者が学習範囲を簡潔に理解できるタイトルを設定できます
                </Typography>
              </span>
            }
            required
            fullWidth
            inputProps={props}
          />
        )}
      />

      <Controller
        name="shared"
        control={control}
        defaultValue={book?.shared ?? true}
        render={({ value, onChange, ...props }) => (
          <div>
            <InputLabel classes={inputLabelClasses} htmlFor="shared">
              他の編集者に共有
            </InputLabel>
            <Checkbox
              id="shared"
              color="primary"
              {...props}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          </div>
        )}
      />

      <Controller
        name="language"
        control={control}
        defaultValue={book?.language ?? languages[0].value}
        render={(props) => (
          <TextField label="教材の主要な言語" select inputProps={props}>
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="timeRequired"
        control={control}
        defaultValue={String(book?.timeRequired ?? "")}
        rules={{
          setValueAs: (value) => (value === "" ? null : +value),
          min: 0,
        }}
        render={(props) => (
          <TextField
            label="学習時間 (秒)"
            type="number"
            inputProps={{ ...props, min: 0 }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue={book?.abstract ?? ""}
        render={(props) => (
          <TextField label="解説" fullWidth multiline inputProps={props} />
        )}
      />

      <Button variant="contained" color="primary" type="submit">
        {submitLabel}
      </Button>
    </Card>
  );
}
