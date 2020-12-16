import { useState, ChangeEvent } from "react";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import useInputLabelStyles from "styles/inputLabel";
import gray from "theme/colors/gray";
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

type Props = { book: Book | null; submitLabel?: string };

export default function BookForm(props: Props) {
  const { book, submitLabel = "更新" } = props;
  const cardClasses = useCardStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const [language, setLanguage] = useState("ja");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };
  return (
    <Card classes={cardClasses} className={classes.margin}>
      <TextField
        id="title"
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
        defaultValue={book?.name}
        required
        fullWidth
      />
      <div>
        <InputLabel classes={inputLabelClasses} htmlFor="share">
          他の編集者に共有
        </InputLabel>
        <Checkbox id="share" color="primary" />
      </div>
      <TextField
        id="inLanguage"
        label="教材の主要な言語"
        select
        value={language}
        onChange={handleChange}
      >
        {languages.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField id="timeRequired" label="学習時間" />
      <TextField id="description" label="解説" fullWidth multiline />
      <Button variant="contained" color="primary">
        {submitLabel}
      </Button>
    </Card>
  );
}
