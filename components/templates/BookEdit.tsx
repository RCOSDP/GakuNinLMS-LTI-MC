import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core/styles";
import BookEditChildren from "$organisms/BookEditChildren";
import BookForm from "$organisms/BookForm";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import CollapsibleContent from "$organisms/CollapsibleContent";
import useContainerStyles from "styles/container";
import { BookProps, BookSchema } from "$server/models/book";
import { SectionProps } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
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
}));

type Props = {
  book: BookSchema;
  onSubmit(book: BookProps): void;
  onDelete(book: BookSchema): void;
  onCancel(): void;
  onSectionsUpdate(sections: SectionProps[]): void;
  onTopicImportClick(): void;
  onTopicNewClick(): void;
  onTopicEditClick?(topic: TopicSchema): void;
  onBookImportClick(): void;
  isTopicEditable?(topic: TopicSchema): boolean | undefined;
};

export default function BookEdit(props: Props) {
  const {
    book,
    onSubmit,
    onDelete,
    onCancel,
    onSectionsUpdate,
    onTopicImportClick,
    onTopicNewClick,
    onTopicEditClick,
    onBookImportClick,
    isTopicEditable,
  } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const confirm = useConfirm();
  const [expanded, setExpanded] = useState(false);
  const handleCollapsibleContentClick = () => setExpanded(!expanded);
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
      <CollapsibleContent
        expanded={expanded}
        onCollapsibleContentClick={handleCollapsibleContentClick}
        label={
          <Typography className={classes.subtitle} variant="h5">
            基本情報
            <Typography variant="caption" component="span" aria-hidden="true">
              <RequiredDot />
              は必須項目です
            </Typography>
          </Typography>
        }
      >
        <BookForm className={classes.form} book={book} onSubmit={onSubmit} />
      </CollapsibleContent>
      <Typography className={classes.subtitle} variant="h5">
        トピック
      </Typography>
      <BookEditChildren
        sections={book.sections}
        onTopicPreviewClick={handleTopicPreviewClick}
        onTopicEditClick={onTopicEditClick}
        onTopicImportClick={onTopicImportClick}
        onTopicNewClick={onTopicNewClick}
        onBookImportClick={onBookImportClick}
        onSectionsUpdate={onSectionsUpdate}
        isTopicEditable={isTopicEditable}
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
