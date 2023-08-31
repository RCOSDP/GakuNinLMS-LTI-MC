import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import ContentImportForm from "$organisms/ContentImportForm";
import Container from "$atoms/Container";
import BackButton from "$atoms/BackButton";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    "& > :not($title):not($form)": {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  form: {
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    "& span": {
      verticalAlign: "middle",
    },
    "& .RequiredDot": {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.75),
      marginLeft: theme.spacing(2),
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  books: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 296px)",
    gap: theme.spacing(2),
  },
}));

type Props = {
  importResult?: BooksImportResult;
  onSubmit(book: BooksImportParams): void;
  onCancel(): void;
};

export default function ContentImport({
  importResult,
  onSubmit,
  onCancel,
}: Props) {
  const classes = useStyles();

  const showSuccess = importResult?.errors && importResult.errors.length === 0;
  const showErrors = importResult?.errors && importResult.errors.length > 0;
  const showResult = showSuccess || showErrors;

  return (
    <Container className={classes.container} maxWidth="lg">
      <BackButton onClick={onCancel}>戻る</BackButton>
      <Typography className={classes.title} variant="h4">
        トピックの上書きインポート
      </Typography>
      <ContentImportForm className={classes.form} onSubmit={onSubmit} />
      {showResult && (
        <>
          <Typography className={classes.title} variant="h4">
            インポート結果
          </Typography>
          {showSuccess && <ul>成功</ul>}
          {showErrors && (
            <ul>
              {importResult?.errors?.map((error, index) => (
                <li key={index}>
                  <pre>{error}</pre>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Container>
  );
}
