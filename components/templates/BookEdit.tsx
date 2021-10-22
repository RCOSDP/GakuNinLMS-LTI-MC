import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import makeStyles from "@mui/styles/makeStyles";
import SectionsEdit from "$organisms/SectionsEdit";
import BookForm from "$organisms/BookForm";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import useContainerStyles from "styles/container";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import type { SectionProps } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import type { AuthorSchema, AuthorProps } from "$server/models/author";
import type { IsContentEditable } from "$types/content";
import { useConfirm } from "material-ui-confirm";
import useDialogProps from "$utils/useDialogProps";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    "& > :not($title):not($content)": {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  content: {
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
}));

type Props = {
  book: BookSchema;
  onSubmit(book: BookPropsWithSubmitOptions): void;
  onDelete(book: BookSchema): void;
  onCancel(): void;
  onSectionsUpdate(sections: SectionProps[]): void;
  onTopicImportClick(): void;
  onTopicNewClick(): void;
  onTopicEditClick?(topic: TopicSchema): void;
  onBookImportClick(): void;
  onAuthorsUpdate?(authors: AuthorSchema[]): void;
  onAuthorSubmit?(author: AuthorProps): void;
  isContentEditable?: IsContentEditable;
  linked?: boolean;
};

export default function BookEdit({
  book,
  onSubmit,
  onDelete,
  onCancel,
  onSectionsUpdate,
  onTopicImportClick,
  onTopicNewClick,
  onTopicEditClick,
  onBookImportClick,
  onAuthorsUpdate,
  onAuthorSubmit,
  isContentEditable,
  linked = false,
}: Props) {
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const confirm = useConfirm();
  const {
    data: previewTopic,
    dispatch: setPreviewTopic,
    ...dialogProps
  } = useDialogProps<TopicSchema>();
  const handleTopicPreviewClick = (topic: TopicSchema) =>
    setPreviewTopic(topic);
  const handleDeleteButtonClick = async () => {
    await confirm({
      title: `ブック「${book.name}」を削除します。よろしいですか？`,
      cancellationText: "キャンセル",
      confirmationText: "OK",
    });
    onDelete(book);
  };

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <BackButton onClick={onCancel}>戻る</BackButton>
      <Typography className={classes.title} variant="h4">
        ブック「{book.name}」の編集
      </Typography>
      <Typography className={classes.subtitle} variant="h5">
        トピック
      </Typography>
      <SectionsEdit
        className={classes.content}
        sections={book.sections}
        onTopicPreviewClick={handleTopicPreviewClick}
        onTopicEditClick={onTopicEditClick}
        onTopicImportClick={onTopicImportClick}
        onTopicNewClick={onTopicNewClick}
        onBookImportClick={onBookImportClick}
        onSectionsUpdate={onSectionsUpdate}
        isContentEditable={isContentEditable}
      />
      <Typography className={classes.subtitle} variant="h5">
        基本情報
        <Typography variant="caption" component="span" aria-hidden="true">
          <RequiredDot />
          は必須項目です
        </Typography>
      </Typography>
      <BookForm
        className={classes.content}
        book={book}
        linked={linked}
        variant="update"
        onSubmit={onSubmit}
        onAuthorsUpdate={onAuthorsUpdate}
        onAuthorSubmit={onAuthorSubmit}
      />
      <Button size="small" color="primary" onClick={handleDeleteButtonClick}>
        <DeleteOutlinedIcon />
        ブックを削除
      </Button>
      {previewTopic && (
        <TopicPreviewDialog {...dialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
