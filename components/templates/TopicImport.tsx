import type { FormEvent } from "react";
import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ActionHeader from "$organisms/ActionHeader";
import ActionFooter from "$organisms/ActionFooter";
import TopicPreview from "$organisms/TopicPreview";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import SortSelect from "$atoms/SortSelect";
import AuthorFilter from "$atoms/AuthorFilter";
import SearchTextField from "$atoms/SearchTextField";
import type { TopicSchema } from "$server/models/topic";
import type { SortOrder } from "$server/models/sortOrder";
import type { IsContentEditable } from "$types/content";
import type { Filter } from "$types/filter";
import useContainerStyles from "$styles/container";
import useDialogProps from "$utils/useDialogProps";
import { useSearchAtom } from "$store/search";

const useStyles = makeStyles((theme) => ({
  topics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 296px)",
    gap: theme.spacing(2),
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
  onSortChange?(sort: SortOrder): void;
  onFilterChange?(filter: Filter): void;
  isContentEditable: IsContentEditable;
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
    onSortChange,
    onFilterChange,
    isContentEditable,
  } = props;
  const { query, onSearchInput, onSearchInputReset } = useSearchAtom();
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
  const handleTopicPreviewClick = (topic: TopicSchema) =>
    setPreviewTopic(topic);
  const handleTopicEditClick = (topic: TopicSchema) =>
    isContentEditable(topic) && (() => onTopicEditClick(topic));
  const [infiniteRef] = useInfiniteScroll({ loading, hasNextPage, onLoadMore });
  return (
    <Container ref={infiniteRef} classes={containerClasses} maxWidth="lg">
      <ActionHeader
        title={
          <>
            トピックの再利用
            <Typography variant="body1">
              再利用するトピックを選んで下さい
            </Typography>
          </>
        }
        action={
          <>
            <SortSelect onSortChange={onSortChange} />
            <AuthorFilter onFilterChange={onFilterChange} />
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
            onTopicEditClick={handleTopicEditClick(topic)}
          />
        ))}
        {loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} height={324 /* NOTE: 適当 */} />
          ))}
      </div>
      <ActionFooter maxWidth="lg">
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
            再利用
          </Button>
        </form>
      </ActionFooter>
      {previewTopic && (
        <TopicPreviewDialog {...dialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
