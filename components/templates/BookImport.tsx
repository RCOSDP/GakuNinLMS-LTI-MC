import { FormEvent, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Skeleton from "@mui/material/Skeleton";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TopicPreviewDialog from "$organisms/TopicPreviewDialog";
import ActionHeader from "$organisms/ActionHeader";
import ActionFooter from "$organisms/ActionFooter";
import BookTree from "$organisms/BookTree";
import SortSelect from "$atoms/SortSelect";
import CreatorFilter from "$atoms/CreatorFilter";
import SearchTextField from "$atoms/SearchTextField";
import { BookSchema } from "$server/models/book";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
import { SortOrder } from "$server/models/sortOrder";
import { Filter } from "$types/filter";
import useContainerStyles from "$styles/container";
import { useSearchAtom } from "$store/search";
import useDialogProps from "$utils/useDialogProps";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  books: {
    "&> :not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  form: {
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
}));

type Props = {
  books: BookSchema[];
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?(): void;
  onSubmit({
    books,
    sections,
    topics,
  }: {
    books: BookSchema[];
    sections: SectionSchema[];
    topics: TopicSchema[];
  }): void;
  onCancel(): void;
  onBookPreviewClick?(book: BookSchema): void;
  onBookEditClick?(book: BookSchema): void;
  onTopicEditClick?(topic: TopicSchema): void;
  onSortChange?(sort: SortOrder): void;
  onFilterChange?(filter: Filter): void;
  isBookEditable?(book: BookSchema): boolean | undefined;
  isTopicEditable?(topic: TopicSchema): boolean | undefined;
};

export default function BookImport(props: Props) {
  const {
    books,
    loading = false,
    hasNextPage = false,
    onLoadMore = () => undefined,
    onSubmit,
    onCancel,
    onBookPreviewClick,
    onBookEditClick,
    onTopicEditClick,
    onSortChange,
    onFilterChange,
    isBookEditable,
    isTopicEditable,
  } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const { query, onSearchInput, onLtiContextClick, onSearchInputReset } =
    useSearchAtom();
  const [selectedNodeIds, select] = useState<Set<string>>(new Set());
  const handleTreeChange = (nodeId: string) => {
    select((nodeIds) =>
      nodeIds.delete(nodeId) ? new Set(nodeIds) : new Set(nodeIds.add(nodeId))
    );
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selectedBooks: BookSchema[] = [];
    const selectedSections: SectionSchema[] = [];
    const selectedTopics: TopicSchema[] = [];
    selectedNodeIds.forEach((nodeId) => {
      // TODO: BookTree と SectionsTree にある nodeId の構造に合わせて変更
      const [bookId, sectionId, topicId] = nodeId
        .replace(/:[^:]*$/, "")
        .split("-")
        .map((id) => Number(id));
      const book = books.find((book) => book.id === bookId);
      if (!book) return;
      const section = book.sections.find((section) => section.id === sectionId);
      if (!section) {
        selectedBooks.push(book);
        return;
      }
      const topic = section.topics.find((topic) => topic.id === topicId);
      if (!topic) {
        selectedSections.push(section);
        return;
      }
      selectedTopics.push(topic);
    });

    onSubmit({
      books: selectedBooks,
      sections: selectedSections,
      topics: selectedTopics,
    });
  };
  const {
    data: previewTopic,
    dispatch: setPreviewTopic,
    ...topicPreviewDialogProps
  } = useDialogProps<TopicSchema>();
  const handleTopicPreviewClick = (topic: TopicSchema) =>
    setPreviewTopic(topic);
  const [infiniteRef] = useInfiniteScroll({ loading, hasNextPage, onLoadMore });
  return (
    <Container ref={infiniteRef} classes={containerClasses} maxWidth="md">
      <ActionHeader
        title={
          <>
            ブックの再利用
            <Typography variant="body1">
              再利用するトピックを選んで下さい
            </Typography>
          </>
        }
        action={
          <>
            <SortSelect onSortChange={onSortChange} />
            <CreatorFilter onFilterChange={onFilterChange} />
            <SearchTextField
              label="ブック・トピック検索"
              value={query.input}
              onSearchInput={onSearchInput}
              onSearchInputReset={onSearchInputReset}
            />
          </>
        }
      />
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {books.map((book) => {
          const handleItem =
            (handler?: (topic: TopicSchema) => void) =>
            ([sectionIndex, topicIndex]: ItemIndex) =>
              handler?.(book.sections[sectionIndex].topics[topicIndex]);
          return (
            <BookTree
              key={book.id}
              book={book}
              onItemPreviewClick={handleItem(handleTopicPreviewClick)}
              onItemEditClick={handleItem(onTopicEditClick)}
              onBookPreviewClick={onBookPreviewClick}
              onBookEditClick={
                isBookEditable?.(book) ? onBookEditClick : undefined
              }
              onLtiContextClick={onLtiContextClick}
              isTopicEditable={isTopicEditable}
              onTreeChange={handleTreeChange}
            />
          );
        })}
      </TreeView>
      {loading && [...Array(5)].map((_, i) => <Skeleton key={i} height={40} />)}
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
            再利用
          </Button>
        </form>
      </ActionFooter>
      {previewTopic && (
        <TopicPreviewDialog {...topicPreviewDialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
