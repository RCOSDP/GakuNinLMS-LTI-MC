import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import BookForm from "$organisms/BookForm";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import useContainerStyles from "styles/container";
import { BookProps, BookSchema } from "$server/models/book";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(4),
    "& span": {
      verticalAlign: "middle",
    },
    "& .RequiredDot": {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.75),
      marginLeft: theme.spacing(2),
    },
  },
}));

type Props = {
  book?: BookSchema;
  onSubmit: (book: BookProps) => void;
  onCancel(): void;
};

export default function BookNew(props: Props) {
  const { book, onSubmit, onCancel } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <BackButton onClick={onCancel}>戻る</BackButton>
      <Typography className={classes.title} variant="h4">
        ブックの作成
        <Typography variant="caption" component="span" aria-hidden="true">
          <RequiredDot />
          は必須項目です
        </Typography>
      </Typography>
      <BookForm book={book} submitLabel="作成" onSubmit={onSubmit} />
    </Container>
  );
}
