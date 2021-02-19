import { FormEvent, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ActionHeader from "$organisms/ActionHeader";
import ActionFooter from "$organisms/ActionFooter";
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
    gridTemplateColumns: "repeat(auto-fill, 290px)",
    gap: `${theme.spacing(2)}px`,
  },
  form: {
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
}));

type Props = {
  topics: TopicSchema[];
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?(): void;
  onSubmit(topics: TopicSchema[]): void;
  onCancel(): void;
  onTopicEditClick(topic: TopicSchema): void;
  isTopicEditable(topic: TopicSchema): boolean | undefined;
};

export default function TopicImport(props: Props) {
  const {
    topics,
    loading = false,
    hasNextPage = false,
    onLoadMore = () => undefined,
    onSubmit,
    onCancel,
    onTopicEditClick,
    isTopicEditable,
  } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const [selectedIndexes, select] = useState<Set<number>>(new Set());
  const handleChecked = (index: number) => () =>
    select((indexes) =>
      indexes.delete(index) ? new Set(indexes) : new Set(indexes.add(index))
    );
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit([...selectedIndexes].map((i) => topics[i]));
  };
  const {
    data: previewTopic,
    dispatch: setPreviewTopic,
    ...dialogProps
  } = useDialogProps<TopicSchema>();
  const handleTopicDetailClick = (topic: TopicSchema) => setPreviewTopic(topic);
  const handleTopicEditClick = (topic: TopicSchema) =>
    isTopicEditable(topic) && (() => onTopicEditClick(topic));
  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading,
    hasNextPage,
    onLoadMore,
  });
  return (
    <Container ref={infiniteRef} classes={containerClasses} maxWidth="md">
      <ActionHeader
        title={
          <>
            トピックのインポート
            <Typography variant="body1">
              インポートするトピックを選んでください
            </Typography>
          </>
        }
        action={
          <>
            <SortSelect disabled /* TODO: ソート機能を追加したら有効化して */ />
            <SearchTextField
              placeholder="トピック検索"
              disabled // TODO: トピック検索機能追加したら有効化して
            />
          </>
        }
      />
      <div className={classes.topics}>
        {topics.map((topic, index) => (
          <TopicPreview
            key={index}
            topic={topic}
            checked={selectedIndexes.has(index)}
            onChange={handleChecked(index)}
            onTopicDetailClick={handleTopicDetailClick}
            onTopicEditClick={handleTopicEditClick(topic)}
          />
        ))}
        {loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} height={324 /* NOTE: 適当 */} />
          ))}
      </div>
      <ActionFooter maxWidth="md">
        <form className={classes.form} onSubmit={handleSubmit}>
          <Button
            color="primary"
            size="small"
            variant="text"
            onClick={onCancel}
          >
            キャンセル
          </Button>
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
          >
            トピックをインポート
          </Button>
        </form>
      </ActionFooter>
      {previewTopic && (
        <TopicPreviewDialog {...dialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
