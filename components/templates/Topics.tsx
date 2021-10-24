import { useState } from "react";
import { useConfirm } from "material-ui-confirm";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import ActionHeader from "$organisms/ActionHeader";
import ActionFooter from "$organisms/ActionFooter";
import TopicPreview from "$organisms/TopicPreview";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import SortSelect from "$atoms/SortSelect";
import CreatorFilter from "$atoms/CreatorFilter";
import SearchTextField from "$atoms/SearchTextField";
import { TopicSchema } from "$server/models/topic";
import { SortOrder } from "$server/models/sortOrder";
import { Filter } from "$types/filter";
import useContainerStyles from "$styles/container";
import useDialogProps from "$utils/useDialogProps";
import { useSearchAtom } from "$store/search";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  topics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 296px)",
    gap: theme.spacing(2),
  },
  footerButton: {
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  topics: TopicSchema[];
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?(): void;
  onBookNewClick(topics: TopicSchema[]): void;
  onTopicsShareClick(topics: TopicSchema[], shared: boolean): void;
  onTopicsDeleteClick(topics: TopicSchema[]): void;
  onTopicEditClick(topic: TopicSchema): void;
  onTopicNewClick(): void;
  onSortChange?(sort: SortOrder): void;
  onFilterChange?(filter: Filter): void;
};

export default function Topics(props: Props) {
  const {
    topics,
    loading = false,
    hasNextPage = false,
    onLoadMore = () => undefined,
    onBookNewClick,
    onTopicsShareClick,
    onTopicsDeleteClick,
    onTopicEditClick,
    onTopicNewClick,
    onSortChange,
    onFilterChange,
  } = props;
  const { query, onSearchInput, onSearchInputReset } = useSearchAtom();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const confirm = useConfirm();

  const [selectedIndexes, select] = useState<Set<number>>(new Set());
  const handleChecked = (index: number) => () =>
    select((indexes) =>
      indexes.delete(index) ? new Set(indexes) : new Set(indexes.add(index))
    );
  const handleBookNewClick = () => {
    onBookNewClick([...selectedIndexes].map((i) => topics[i]));
  };
  const handleTopicsShareClick = () => {
    onTopicsShareClick(
      [...selectedIndexes].map((i) => topics[i]),
      true
    );
  };
  const handleTopicsUnshareClick = () => {
    onTopicsShareClick(
      [...selectedIndexes].map((i) => topics[i]),
      false
    );
  };
  const handleTopicsDeleteClick = async () => {
    const ids = [...selectedIndexes].map((i) => topics[i]);
    if (!ids || !ids.length) return;

    await confirm({
      title: `${ids.length}件のトピックを削除します。よろしいですか？`,
      cancellationText: "キャンセル",
      confirmationText: "OK",
    });
    onTopicsDeleteClick(ids);
  };
  const {
    data: previewTopic,
    dispatch: setPreviewTopic,
    ...dialogProps
  } = useDialogProps<TopicSchema>();
  const handleTopicPreviewClick = (topic: TopicSchema) =>
    setPreviewTopic(topic);
  const [infiniteRef] = useInfiniteScroll({ loading, hasNextPage, onLoadMore });
  return (
    <Container ref={infiniteRef} classes={containerClasses} maxWidth="lg">
      <ActionHeader
        title={
          <>
            トピック
            <Button size="small" color="primary" onClick={onTopicNewClick}>
              <AddIcon className={classes.icon} />
              トピックの作成
            </Button>
          </>
        }
        action={
          <>
            <SortSelect onSortChange={onSortChange} />
            <CreatorFilter onFilterChange={onFilterChange} />
            <SearchTextField
              label="トピック検索"
              value={query.input}
              onSearchInput={onSearchInput}
              onSearchInputReset={onSearchInputReset}
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
            onTopicPreviewClick={handleTopicPreviewClick}
            onTopicEditClick={onTopicEditClick}
          />
        ))}
        {loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} height={324 /* NOTE: 適当 */} />
          ))}
      </div>
      <ActionFooter maxWidth="lg">
        <Button
          className={classes.footerButton}
          color="primary"
          size="large"
          variant="contained"
          onClick={handleBookNewClick}
        >
          ブック作成
        </Button>
        <Button
          className={classes.footerButton}
          color="primary"
          size="large"
          variant="contained"
          onClick={handleTopicsShareClick}
        >
          シェア
        </Button>
        <Button
          className={classes.footerButton}
          color="primary"
          size="large"
          variant="contained"
          onClick={handleTopicsUnshareClick}
        >
          シェア解除
        </Button>
        <Button
          className={classes.footerButton}
          color="error"
          size="large"
          variant="contained"
          onClick={handleTopicsDeleteClick}
        >
          削除
        </Button>
      </ActionFooter>
      {previewTopic && (
        <TopicPreviewDialog {...dialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
