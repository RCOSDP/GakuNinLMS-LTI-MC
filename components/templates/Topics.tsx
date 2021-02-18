import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import ActionHeader from "$organisms/ActionHeader";
import TopicPreview from "$organisms/TopicPreview";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import SortSelect from "$atoms/SortSelect";
import SearchTextField from "$atoms/SearchTextField";
import { TopicSchema } from "$server/models/topic";
import useContainerStyles from "$styles/container";
import useDialogProps from "$utils/useDialogProps";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  topics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 380px)",
    gap: `${theme.spacing(2)}px`,
  },
}));

type Props = {
  topics: TopicSchema[];
  onTopicEditClick(topic: TopicSchema): void;
  onTopicNewClick(): void;
};

export default function Topics(props: Props) {
  const { topics, onTopicEditClick, onTopicNewClick } = props;
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
      <ActionHeader
        title={
          <>
            マイトピック
            <Button size="small" color="primary" onClick={onTopicNewClick}>
              <AddIcon className={classes.icon} />
              トピックの作成
            </Button>
          </>
        }
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