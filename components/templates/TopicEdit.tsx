import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import TopicForm from "$organisms/TopicForm";
import RequiredDot from "$atoms/RequiredDot";
import useContainerStyles from "styles/container";
import { TopicProps, TopicSchema } from "$server/models/topic";
import { VideoTrackProps, VideoTrackSchema } from "$server/models/videoTrack";

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
  form: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  topic: TopicSchema | null;
  onSubmit(topic: TopicProps): void;
  onDeleteSubtitle(videoTrack: VideoTrackSchema): void;
  onSubmitSubtitle(videoTrack: VideoTrackProps): void;
};

export default function TopicEdit(props: Props) {
  const { topic, onSubmit, onDeleteSubtitle, onSubmitSubtitle } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
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
        onSubmit={onSubmit}
        onDeleteSubtitle={onDeleteSubtitle}
        onSubmitSubtitle={onSubmitSubtitle}
      />
      <Button size="small" color="primary">
        <DeleteOutlined />
        トピックを削除
      </Button>
    </Container>
  );
}
