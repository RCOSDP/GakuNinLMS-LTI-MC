import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
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
  linked?: boolean;
  className?: string;
  variant?: "create" | "update";
  onSubmit?: (book: BookPropsWithSubmitOptions) => void;
};

export default function BookForm({
  book,
  className,
  id,
  linked = false,
  variant = "create",
  onSubmit = () => undefined,
}: Props) {
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
    setValue,
  } = useForm<BookPropsWithSubmitOptions>({
    defaultValues,
  });

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      id={id}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
      <div>
        <InputLabel classes={inputLabelClasses} htmlFor="shared">
          他の教員にシェア
        </InputLabel>
        <Checkbox
          id="shared"
          name="shared"
          onChange={(_, checked) => setValue("shared", checked)}
          defaultChecked={defaultValues.shared}
          color="primary"
        />
      </div>
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
      {!linked && (
        <div>
          <InputLabel classes={inputLabelClasses} htmlFor="submit-with-link">
            {label[variant].submitWithLink}
          </InputLabel>
          <Checkbox
            id="submit-with-link"
            name="submitWithLink"
            onChange={(_, checked) => setValue("submitWithLink", checked)}
            defaultChecked={defaultValues.submitWithLink}
            color="primary"
          />
        </div>
      )}
      <Button variant="contained" color="primary" type="submit">
        {label[variant].submit}
      </Button>
    </Card>
  );
}
