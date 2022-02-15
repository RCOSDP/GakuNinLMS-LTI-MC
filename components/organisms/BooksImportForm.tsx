import { Buffer } from "buffer";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import gray from "theme/colors/gray";
import { useSessionAtom } from "$store/session";
import type { AuthorSchema } from "$server/models/author";
import type { BooksImportParams } from "$server/models/booksImportParams";
import AuthorsInput from "$organisms/AuthorsInput";
import { NEXT_PUBLIC_API_BASE_PATH } from "$utils/env";
import { useAuthorsAtom } from "$store/authors";

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
  className?: string;
  onSubmit?: (book: BooksImportParams) => void;
  onAuthorSubmit(author: Pick<AuthorSchema, "email">): void;
};

export default function BooksImportForm(props: Props) {
  const { className, onSubmit = () => undefined } = props;
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const { session } = useSessionAtom();
  const authorsInputProps = useAuthorsAtom();
  const providers: { [key: string]: string } = {};
  if (session?.systemSettings?.wowzaUploadEnabled) {
    providers.wowza = "https://www.wowza.com/";
  }
  const defaultValues: BooksImportParams = {
    authors: [],
    json: "",
    file: "",
    provider: Object.values(providers)[0] ?? "",
    wowzaBaseUrl: `${NEXT_PUBLIC_API_BASE_PATH}/api/v2/wowza`,
  };
  const { handleSubmit, register } = useForm<BooksImportParams>({
    defaultValues,
  });

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      component="form"
      onSubmit={handleSubmit((values: BooksImportParams) => {
        values.authors = authorsInputProps.authors;

        if (values?.file?.length) {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              onSubmit({
                ...values,
                file: Buffer.from(reader.result as ArrayBuffer).toString(
                  "base64"
                ),
              });
            },
            false
          );
          reader.readAsArrayBuffer(values.file[0] as unknown as File);
        } else {
          onSubmit({ ...values, file: undefined });
        }
      })}
    >
      <TextField
        label={
          <>
            json ファイル、または json ファイルを含む zip ファイル
            <Typography
              className={classes.labelDescription}
              variant="caption"
              component="span"
            >
              <Link
                href="https://github.com/npocccties/chilospeech/blob/main/docs/spec/import.md"
                target="_blank"
                rel="noreferrer"
              >
                json ファイルの仕様
              </Link>
            </Typography>
          </>
        }
        type="file"
        inputProps={register("file")}
      />
      {Boolean(Object.entries(providers).length) && (
        <TextField
          label={
            <>
              動画ファイルをアップロードするサービス
              <Typography
                className={classes.labelDescription}
                variant="caption"
                component="span"
              >
                動画ファイルのアップロード先です。URL
                による指定の場合は無視されます
              </Typography>
            </>
          }
          select
          defaultValue={defaultValues.provider}
          inputProps={register("provider")}
        >
          {Object.entries(providers).map(([label, value]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      )}
      <AuthorsInput
        {...authorsInputProps}
        onAuthorsUpdate={(authors) => {
          authorsInputProps.updateState({ authors });
        }}
        onAuthorSubmit={props.onAuthorSubmit}
      />
      <Button variant="contained" color="primary" type="submit">
        インポート
      </Button>
    </Card>
  );
}
