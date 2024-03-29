import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import makeStyles from "@mui/styles/makeStyles";
import BookForm from "$organisms/BookForm";
import Container from "$atoms/Container";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import type { AuthorSchema } from "$server/models/author";
import { useSessionAtom } from "$store/session";

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
  topics?: TopicSchema[];
  onSubmit: (book: BookPropsWithSubmitOptions) => void;
  onCancel(): void;
  onAuthorsUpdate(authors: AuthorSchema[]): void;
  onAuthorSubmit(author: Pick<AuthorSchema, "email">): void;
};

export default function BookNew({
  book,
  topics,
  onSubmit,
  onCancel,
  onAuthorsUpdate,
  onAuthorSubmit,
}: Props) {
  const { session, isContentEditable } = useSessionAtom();
  const forkFrom =
    book && !isContentEditable(book) && book.authors.length > 0 && book.authors;
  const defaultBook = book && {
    ...book,
    ...(forkFrom && { name: [book.name, "フォーク"].join("_") }),
  };
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md">
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
      {topics && (
        <Alert className={classes.alert} severity="info">
          以下のトピックを追加します
          <ul>
            {topics.map((topic) => (
              <li key={topic.id}>{topic.name}</li>
            ))}
          </ul>
        </Alert>
      )}
      <BookForm
        book={defaultBook}
        topics={topics}
        linked={false}
        hasLtiTargetLinkUri={Boolean(session?.ltiTargetLinkUri)}
        variant="create"
        onSubmit={onSubmit}
        onAuthorsUpdate={onAuthorsUpdate}
        onAuthorSubmit={onAuthorSubmit}
      />
    </Container>
  );
}
