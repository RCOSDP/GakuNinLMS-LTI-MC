import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TopBar from "$organisms/TopBar";
import TopicPreview from "$organisms/TopicPreview";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import SortSelect from "$atoms/SortSelect";
import SearchTextField from "$atoms/SearchTextField";
import { TopicSchema } from "$server/models/topic";
import useContainerStyles from "$styles/container";
import useDialogProps from "$utils/useDialogProps";

const useStyles = makeStyles((theme) => ({
  topics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 380px)",
    gap: `${theme.spacing(2)}px`,
  },
}));

type Props = {
  topics: TopicSchema[];
  onTopicEditClick(topic: TopicSchema): void;
};

export default function Topics(props: Props) {
  const { topics, onTopicEditClick } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const {
    data: previewTopic,
    dispatch: setPreviewTopic,
    ...dialogProps
  } = useDialogProps<TopicSchema>();
  const handleTopicDetailClick = (topic: TopicSchema) => setPreviewTopic(topic);
  return (
    <Container classes={containerClasses} maxWidth="lg">
      <TopBar
        title="マイトピック"
        action={
          <>
            <SortSelect disabled /* TODO: ソート機能を追加したら有効化して */ />
            <SearchTextField
              placeholder="トピック検索"
              disabled // TODO: ブック・トピック検索機能追加したら有効化して
            />
          </>
        }
      />
      <div className={classes.topics}>
        {topics.map((topic, index) => (
          <TopicPreview
            key={index}
            topic={topic}
            onTopicDetailClick={handleTopicDetailClick}
            onTopicEditClick={onTopicEditClick}
          />
        ))}
      </div>
      {previewTopic && (
        <TopicPreviewDialog {...dialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
