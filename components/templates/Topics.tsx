import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import ActionHeader from "$organisms/ActionHeader";
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
}));

type Props = {
  topics: TopicSchema[];
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?(): void;
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
    onTopicEditClick,
    onTopicNewClick,
    onSortChange,
    onFilterChange,
  } = props;
  const { query, onSearchInput, onSearchInputReset } = useSearchAtom();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
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
            onTopicPreviewClick={handleTopicPreviewClick}
            onTopicEditClick={onTopicEditClick}
          />
        ))}
        {loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} height={324 /* NOTE: 適当 */} />
          ))}
      </div>
      {previewTopic && (
        <TopicPreviewDialog {...dialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
