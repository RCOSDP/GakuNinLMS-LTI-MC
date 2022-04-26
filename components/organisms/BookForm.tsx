import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import makeStyles from "@mui/styles/makeStyles";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ja from "date-fns/locale/ja";
import InputLabel from "$atoms/InputLabel";
import TextField from "$atoms/TextField";
import AuthorsInput from "$organisms/AuthorsInput";
import KeywordsInput from "$organisms/KeywordsInput";
import DomainsInput from "$organisms/DomainsInput";
import useCardStyles from "styles/card";
import gray from "theme/colors/gray";
import type { BookSchema } from "$server/models/book";
import type { PublicBookSchema } from "$server/models/book/public";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import type { AuthorSchema } from "$server/models/author";
import { useAuthorsAtom } from "store/authors";
import languages from "$utils/languages";
import useKeywordsInput from "$utils/useKeywordsInput";
import useDomainsInput from "$utils/useDomainsInput";

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
  topics?: number[];
  id?: string;
  linked?: boolean;
  className?: string;
  variant?: "create" | "update";
  onSubmit?: (book: BookPropsWithSubmitOptions) => void;
  onAuthorsUpdate(authors: AuthorSchema[]): void;
  onAuthorSubmit(author: Pick<AuthorSchema, "email">): void;
};

export default function BookForm({
  book,
  topics,
  className,
  id,
  linked = false,
  variant = "create",
  onSubmit = () => undefined,
  onAuthorsUpdate,
  onAuthorSubmit,
}: Props) {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const { updateState: _updateState, ...authorsInputProps } = useAuthorsAtom();
  const keywordsInputProps = useKeywordsInput(book?.keywords ?? []);
  const [enablePublicBook, setEnablePublicBook] = useState(
    Boolean(book?.publicBooks?.length)
  );
  const [expireAt, setExpireAt] = useState<Date | null>(
    book?.publicBooks?.[0]?.expireAt ?? null
  );
  const [expireAtError, setExpireAtError] = useState(false);
  const handleExpireAtChange = useCallback(
    (newValue) => {
      setExpireAtError(newValue && Number.isNaN(newValue.getTime()));
      setExpireAt(newValue);
    },
    [setExpireAt]
  );
  const domainsInputProps = useDomainsInput(
    book?.publicBooks?.[0]?.domains ?? []
  );
  const defaultValues: BookPropsWithSubmitOptions = {
    name: book?.name ?? "",
    description: book?.description ?? "",
    shared: Boolean(book?.shared),
    language: book?.language ?? Object.getOwnPropertyNames(languages)[0],
    sections: book?.sections,
    authors: book?.authors ?? [],
    keywords: book?.keywords ?? [],
    publicBooks: book?.publicBooks ?? [],
    submitWithLink: false,
  };
  const { handleSubmit, register, setValue } =
    useForm<BookPropsWithSubmitOptions>({
      defaultValues,
    });
  setValue("topics", topics);

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      id={id}
      component="form"
      onSubmit={handleSubmit((values) => {
        if (expireAt && Number.isNaN(expireAt.getTime())) return;

        if (enablePublicBook) {
          const publicBook = book?.publicBooks?.[0] ?? ({} as PublicBookSchema);
          // @ts-expect-error TODO: 画面上ではnullでないといけないが、送信時はundefinedでないといけない
          publicBook.expireAt = expireAt ?? undefined;
          publicBook.domains = domainsInputProps.domains;
          values.publicBooks = [publicBook];
        } else {
          values.publicBooks = [];
        }
        values.authors = authorsInputProps.authors;
        values.keywords = keywordsInputProps.keywords;
        onSubmit(values);
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
      <KeywordsInput {...keywordsInputProps} />
      <TextField
        label="解説"
        fullWidth
        multiline
        inputProps={register("description")}
      />
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
        {` `}
        に一部準拠しています
      </Typography>

      <div>
        <InputLabel htmlFor="enable-public-book">
          公開URLを有効にする
        </InputLabel>
        <Checkbox
          id="enable-public-book"
          name="enablePublicBook"
          onChange={(_, checked) => setEnablePublicBook(checked)}
          defaultChecked={enablePublicBook}
          color="primary"
        />
      </div>
      {enablePublicBook && (
        <>
          <div>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={ja}
              dateFormats={{ monthAndYear: "yyyy年MM月" }}
            >
              <DateTimePicker
                renderInput={(props) => (
                  <TextField {...props} fullWidth error={expireAtError} />
                )}
                label="公開期限"
                inputFormat="yyyy年MM月dd日 hh時mm分"
                mask="____年__月__日 __時__分"
                toolbarFormat="yyyy年MM月dd日"
                leftArrowButtonText="前月を表示"
                rightArrowButtonText="次月を表示"
                toolbarTitle="日付選択"
                okText="選択"
                cancelText="キャンセル"
                value={expireAt}
                onChange={handleExpireAtChange}
              />
            </LocalizationProvider>
          </div>
          <div>
            <DomainsInput {...domainsInputProps} />
          </div>
        </>
      )}

      <Divider className={classes.divider} />
      {!linked && (
        <div>
          <InputLabel htmlFor="submit-with-link">
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
