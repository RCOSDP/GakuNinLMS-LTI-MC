import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import makeStyles from "@mui/styles/makeStyles";
import BookForm from "$organisms/BookForm";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import useContainerStyles from "styles/container";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import type { AuthorSchema } from "$server/models/author";
import { useSessionAtom } from "$store/session";
import { useTopic } from "$utils/topic";

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
  alert: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  book?: BookSchema;
  topics?: number[];
  onSubmit: (book: BookPropsWithSubmitOptions) => void;
  onCancel(): void;
  onAuthorsUpdate(authors: AuthorSchema[]): void;
  onAuthorSubmit(author: Pick<AuthorSchema, "email">): void;
};

<<<<<<< HEAD
export default function BookNew(props: Props) {
  const { book, topics, onSubmit, onCancel } = props;
  const { isBookEditable } = useSessionAtom();
  const forkFrom = book && !isBookEditable(book) && book.author;
=======
export default function BookNew({
  book,
  onSubmit,
  onCancel,
  onAuthorsUpdate,
  onAuthorSubmit,
}: Props) {
  const { isContentEditable } = useSessionAtom();
  const forkFrom =
    book && !isContentEditable(book) && book.authors.length > 0 && book.authors;
>>>>>>> main
  const defaultBook = book && {
    ...book,
    ...(forkFrom && { name: [book.name, "フォーク"].join("_") }),
  };
  const classes = useStyles();
  const containerClasses = useContainerStyles();

  const availableTopics = [];
  if (topics && topics.length) {
    for (const id of topics) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const topic = useTopic(id);
      if (topic) availableTopics.push(topic);
    }
  }

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
      {forkFrom && (
        <Alert className={classes.alert} severity="info">
          {forkFrom.map(({ name }) => `${name} さん`).join("、")}
          のブックをフォークしようとしています
        </Alert>
      )}
<<<<<<< HEAD
      {topics && (
        <Alert className={classes.alert} severity="info">
          以下のトピックを追加します
          <ul>
            {availableTopics.map((topic) => (
              <li key={topic.id}>{topic.name}</li>
            ))}
          </ul>
        </Alert>
      )}
      <BookForm
        book={defaultBook}
        topics={availableTopics.map((topic) => topic.id)}
        variant="create"
        onSubmit={onSubmit}
=======
      <BookForm
        book={defaultBook}
        variant="create"
        onSubmit={onSubmit}
        onAuthorsUpdate={onAuthorsUpdate}
        onAuthorSubmit={onAuthorSubmit}
>>>>>>> main
      />
    </Container>
  );
}
