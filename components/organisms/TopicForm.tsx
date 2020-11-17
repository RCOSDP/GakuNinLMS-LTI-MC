import { useState, ChangeEvent } from "react";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "atoms/TextField";
import useCardStyles from "styles/card";
import useInputLabelStyles from "styles/inputLabel";

const languages = [
  {
    value: "ja",
    label: "日本語",
  },
  {
    value: "en",
    label: "英語",
  },
];

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:first-child)": {
      marginTop: `${theme.spacing(2.5)}px`,
    },
  },
}));

export default function BookForms() {
  const cardClasses = useCardStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const [language, setLanguage] = useState("ja");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };
  return (
    <Card classes={cardClasses} className={classes.margin}>
      <TextField id="title" label="タイトル" required fullWidth />
      <div>
        <InputLabel classes={inputLabelClasses} htmlFor="share">
          他の編集者に共有
        </InputLabel>
        <Checkbox id="share" color="primary" />
      </div>
      <TextField id="contentURL" label="動画のURL" required fullWidth />
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
        送信
      </Button>
    </Card>
  );
}
