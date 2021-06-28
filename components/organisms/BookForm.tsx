import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import useInputLabelStyles from "styles/inputLabel";
import gray from "theme/colors/gray";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import languages from "$utils/languages";

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
  divider: {
    margin: theme.spacing(0, -3, 0),
  },
  submitOption: {
    display: "flex",
    alignItems: "center",
  },
}));

const label = {
  create: {
    submit: "作成",
    submitWithLink: "作成したブックを提供",
  },
  update: {
    submit: "更新",
    submitWithLink: "更新したブックを提供",
  },
} as const;

type Props = {
  book?: BookSchema;
  id?: string;
  className?: string;
  variant?: "create" | "update";
  onSubmit?: (book: BookPropsWithSubmitOptions) => void;
};

export default function BookForm(props: Props) {
  const {
    book,
    className,
    id,
    variant = "create",
    onSubmit = () => undefined,
  } = props;
  const cardClasses = useCardStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const defaultValues: BookPropsWithSubmitOptions = {
    name: book?.name ?? "",
    description: book?.description ?? "",
    shared: Boolean(book?.shared),
    language: book?.language ?? Object.getOwnPropertyNames(languages)[0],
    sections: book?.sections,
    submitWithLink: false,
  };
  const {
    handleSubmit,
    register,
    control,
  } = useForm<BookPropsWithSubmitOptions>({
    defaultValues,
  });

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      id={id}
      component="form"
      onSubmit={handleSubmit((values: BookPropsWithSubmitOptions) => {
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
        required
        fullWidth
      />
      <div>
        <InputLabel classes={inputLabelClasses} htmlFor="shared">
          他の教員にシェア
        </InputLabel>
        <Checkbox
          id="shared"
          name="shared"
          inputRef={register}
          defaultChecked={defaultValues.shared}
          color="primary"
        />
      </div>
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
        name="description"
        inputRef={register}
      />
      <Divider className={classes.divider} />
      <div className={classes.submitOption}>
        <Checkbox
          id="submit-with-link"
          name="submitWithLink"
          inputRef={register}
          defaultChecked={defaultValues.submitWithLink}
          color="primary"
        />
        <InputLabel classes={inputLabelClasses} htmlFor="submit-with-link">
          {label[variant].submitWithLink}
        </InputLabel>
      </div>
      <Button variant="contained" color="primary" type="submit">
        {label[variant].submit}
      </Button>
    </Card>
  );
}
