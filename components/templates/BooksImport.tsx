import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core/styles";
import BookEditChildren from "$organisms/BookEditChildren";
import BooksImportForm from "$organisms/BooksImportForm";
import BookAccordion from "$organisms/BookAccordion";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import CollapsibleContent from "$organisms/CollapsibleContent";
import useContainerStyles from "styles/container";
import { BooksImportParams, booksImportParamsSchema, BooksImportResult, booksImportResultSchema } from "$server/validators/booksImportParams";
import { useConfirm } from "material-ui-confirm";
import useDialogProps from "$utils/useDialogProps";

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
    marginTop: theme.spacing(1),
  },
}));

type Props = {
  importBooks?: booksImportParamsSchema;
  importResult?: booksImportResultSchema
  onSubmit(book: BooksImportParams): void;
  onCancel(): void;
};

export default function BooksImport(props: Props) {
  const {
    importBooks,
    importResult,
    onSubmit,
    onCancel,
  } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();

  const showSuccess = importResult.books && importResult.books.length > 0;
  const showErrors = importResult.errors && importResult.errors.length > 0;
  const showResult = showSuccess || showErrors;
  const showForm = !showSuccess;

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <BackButton onClick={onCancel}>戻る</BackButton>
      {showForm &&
        <>
          <Typography className={classes.title} variant="h4">
            ブックのインポート
          </Typography>
          <BooksImportForm importBooks={importBooks} className={classes.form} onSubmit={onSubmit} />
        </>
      }
      {showResult &&
        <>
          <Typography className={classes.title} variant="h4">
            インポート結果
          </Typography>
          {showSuccess &&
            <div className={classes.books}>
              {importResult.books.map((book) => (
                <BookAccordion
                  key={book.id}
                  book={book}
                />
              ))}
            </div>
          }
          {showErrors &&
            <>
              {importResult.errors.map((error) => (
                <>{error}</>
              ))}
            </>
          }
        </>
      }
    </Container>
  );
}
