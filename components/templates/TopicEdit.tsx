import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import makeStyles from "@mui/styles/makeStyles";
import TopicForm from "$organisms/TopicForm";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import useContainerStyles from "styles/container";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";
import type { AuthorSchema, AuthorProps } from "$server/models/author";
import { useConfirm } from "material-ui-confirm";

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
  form: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  topic: TopicSchema;
  onSubmit(topic: TopicProps): void;
  onDelete(topic: TopicSchema): void;
  onCancel(): void;
  onSubtitleDelete(videoTrack: VideoTrackSchema): void;
  onSubtitleSubmit(videoTrack: VideoTrackProps): void;
  onAuthorsUpdate(authors: AuthorSchema[]): void;
  onAuthorSubmit(author: AuthorProps): void;
};

export default function TopicEdit(props: Props) {
  const {
    topic,
    onSubmit,
    onDelete,
    onCancel,
    onSubtitleDelete,
    onSubtitleSubmit,
    onAuthorsUpdate,
    onAuthorSubmit,
  } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const confirm = useConfirm();
  const handleDeleteButtonClick = async () => {
    await confirm({
      title: `トピック「${topic.name}」を削除します。よろしいですか？`,
      cancellationText: "キャンセル",
      confirmationText: "OK",
    });
    onDelete(topic);
  };

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <BackButton onClick={onCancel}>戻る</BackButton>
      <Typography className={classes.title} variant="h4">
        トピックの編集
        <Typography variant="caption" component="span" aria-hidden="true">
          <RequiredDot />
          は必須項目です
        </Typography>
      </Typography>
      <TopicForm
        className={classes.form}
        topic={topic}
        variant="update"
        onSubmit={onSubmit}
        onSubtitleDelete={onSubtitleDelete}
        onSubtitleSubmit={onSubtitleSubmit}
        onAuthorsUpdate={onAuthorsUpdate}
        onAuthorSubmit={onAuthorSubmit}
      />
      <Button size="small" color="primary" onClick={handleDeleteButtonClick}>
        <DeleteOutlinedIcon />
        トピックを削除
      </Button>
    </Container>
  );
}
