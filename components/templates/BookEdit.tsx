import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import BookEditChildren from "$organisms/BookEditChildren";
import BookForm from "$organisms/BookForm";
import RequiredDot from "$atoms/RequiredDot";
import useContainerStyles from "styles/container";
import { BookProps } from "$server/models/book";
import { Book, Topic } from "types/book";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  container: {
    marginTop: theme.spacing(4),
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
  children: {
    marginBottom: theme.spacing(2),
  },
  form: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  book: Book | null;
  onSubmit(book: BookProps): void;
  onTopicClick(topic: Topic): void;
};

export default function BookEdit(props: Props) {
  const { book, onSubmit, onTopicClick } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const handleTopicClick = (topic: Topic) => onTopicClick(topic);

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <Typography className={classes.title} variant="h4">
        ブックの編集
        <Typography variant="caption" component="span" aria-hidden="true">
          <RequiredDot />
          は必須項目です
        </Typography>
      </Typography>
      <BookEditChildren
        className={classes.children}
        sections={book?.sections ?? []}
        onTopicClick={handleTopicClick}
      />
      <BookForm className={classes.form} book={book} onSubmit={onSubmit} />
      <Button size="small" color="primary">
        <DeleteOutlined />
        ブックを削除
      </Button>
    </Container>
  );
}
