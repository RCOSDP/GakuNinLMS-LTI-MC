import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import ContentImportForm from "$organisms/ContentImportForm";
import ContentPreview from "$organisms/ContentPreview";
import Container from "$atoms/Container";
import BackButton from "$atoms/BackButton";
import { useSearchAtom } from "$store/search";
import type {
  BooksImportParams,
  BooksImportResult,
} from "$server/models/booksImportParams";
import type { ContentSchema } from "$server/models/content";

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
  onContentPreviewClick(content: ContentSchema): void;
  onSubmit(book: BooksImportParams): void;
  onCancel(): void;
};

export default function ContentImport({
  importResult,
  onContentPreviewClick,
  onSubmit,
  onCancel,
}: Props) {
  const classes = useStyles();
  const searchProps = useSearchAtom();

  const showSuccess = importResult?.books && importResult.books.length > 0;
  const showErrors = importResult?.errors && importResult.errors.length > 0;
  const showResult = showSuccess || showErrors;
  const showForm = !showSuccess;

  return (
    <Container className={classes.container} maxWidth="lg">
      <BackButton onClick={onCancel}>戻る</BackButton>
      {showForm && (
        <>
          <Typography className={classes.title} variant="h4">
            トピックの上書きインポート
          </Typography>
          <ContentImportForm className={classes.form} onSubmit={onSubmit} />
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
                  content={{ type: "book", ...book }}
                  onContentPreviewClick={onContentPreviewClick}
                  onKeywordClick={searchProps.onKeywordClick}
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
