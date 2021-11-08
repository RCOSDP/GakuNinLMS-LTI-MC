import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import makeStyles from "@mui/styles/makeStyles";
import BooksImportForm from "$organisms/BooksImportForm";
import ContentPreview from "$organisms/ContentPreview";
import BackButton from "$atoms/BackButton";
import useContainerStyles from "styles/container";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import type { BookSchema } from "$server/models/book";
import type { AuthorSchema } from "$server/models/author";

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
  onBookPreviewClick(book: BookSchema): void;
  onSubmit(book: BooksImportParams): void;
  onCancel(): void;
  onAuthorSubmit(author: Pick<AuthorSchema, "email">): void;
};

export default function BooksImport({
  importResult,
  onBookPreviewClick,
  onSubmit,
  onCancel,
  onAuthorSubmit,
}: Props) {
  const classes = useStyles();
  const containerClasses = useContainerStyles();

  const showSuccess = importResult?.books && importResult.books.length > 0;
  const showErrors = importResult?.errors && importResult.errors.length > 0;
  const showResult = showSuccess || showErrors;
  const showForm = !showSuccess;

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="lg"
    >
      <BackButton onClick={onCancel}>戻る</BackButton>
      {showForm && (
        <>
          <Typography className={classes.title} variant="h4">
            ブックのインポート
          </Typography>
          <BooksImportForm
            className={classes.form}
            onSubmit={onSubmit}
            onAuthorSubmit={onAuthorSubmit}
          />
        </>
      )}
      {showResult && (
        <>
          <Typography className={classes.title} variant="h4">
            インポート結果
          </Typography>
          {showSuccess && (
            <div className={classes.books}>
              {importResult?.books?.map((book) => (
                <ContentPreview
                  key={book.id}
                  content={book}
                  onContentPreviewClick={onBookPreviewClick}
                />
              ))}
            </div>
          )}
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
