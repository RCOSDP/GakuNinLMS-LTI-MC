import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import TopicForm from "$organisms/TopicForm";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import useContainerStyles from "styles/container";
import type { TopicProps, TopicSchema } from "$server/models/topic";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";
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
  topic?: TopicSchema;
  onSubmit(topic: TopicProps): void;
  onSubtitleDelete(videoTrack: VideoTrackSchema): void;
  onSubtitleSubmit(videoTrack: VideoTrackProps): void;
  onCancel(): void;
};

export default function TopicNew(props: Props) {
  const {
    topic,
    onSubmit,
    onSubtitleDelete,
    onSubtitleSubmit,
    onCancel,
  } = props;
  const { isTopicEditable } = useSessionAtom();
  const forkFrom = topic && !isTopicEditable(topic) && topic.creator;
  const defaultTopic = topic && {
    ...topic,
    ...(forkFrom && { name: [topic.name, "フォーク"].join("_") }),
  };
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
        トピックの作成
        <Typography variant="caption" component="span" aria-hidden="true">
          <RequiredDot />
          は必須項目です
        </Typography>
      </Typography>
      {forkFrom && (
        <Alert className={classes.alert} severity="info">
          {forkFrom.name} さんが作成したトピックをフォークしようとしています
        </Alert>
      )}
      <TopicForm
        topic={defaultTopic}
        submitLabel="作成"
        onSubmit={onSubmit}
        onSubtitleDelete={onSubtitleDelete}
        onSubtitleSubmit={onSubtitleSubmit}
      />
    </Container>
  );
}
