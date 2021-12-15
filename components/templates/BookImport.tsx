import type { FormEvent } from "react";
import { useState } from "react";
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
import SearchPagination from "$organisms/SearchPagination";
import SortSelect from "$atoms/SortSelect";
import AuthorFilter from "$atoms/AuthorFilter";
import SearchTextField from "$atoms/SearchTextField";
import type { ContentSchema } from "$server/models/content";
import type { BookSchema } from "$server/models/book";
import type { SectionSchema } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import type { IsContentEditable } from "$types/content";
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
  pagination: {
    marginTop: theme.spacing(4),
  },
}));

type Props = {
  totalCount: number;
  contents: ContentSchema[];
  loading?: boolean;
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
  isContentEditable?: IsContentEditable;
};

export default function BookImport(props: Props) {
  const {
    totalCount,
    contents,
    loading = false,
    onSubmit,
    onCancel,
    onBookPreviewClick,
    onBookEditClick,
    onTopicEditClick,
    isContentEditable,
  } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const searchProps = useSearchAtom();
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
      const book = contents.find(
        (content) => content.type === "book" && content.id === bookId
      );
      if (book?.type !== "book") return;
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
  return (
    <Container classes={containerClasses} maxWidth="lg">
      <Typography sx={{ mt: 5 }} variant="h4">
        ブックの再利用
      </Typography>
      <Typography sx={{ mt: 1 }} variant="body1">
        再利用するトピックを選んで下さい
      </Typography>
      <ActionHeader>
        <SortSelect onSortChange={searchProps.onSortChange} />
        <AuthorFilter onFilterChange={searchProps.onFilterChange} />
        <SearchTextField
          label="ブック・トピック検索"
          value={searchProps.input}
          onSearchInput={searchProps.onSearchInput}
          onSearchInputReset={searchProps.onSearchInputReset}
          onSearchSubmit={searchProps.onSearchSubmit}
        />
      </ActionHeader>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {contents.map((content) => {
          if (content.type !== "book") return null;
          const handleItem =
            (handler?: (topic: TopicSchema) => void) =>
            ([sectionIndex, topicIndex]: ItemIndex) =>
              handler?.(content.sections[sectionIndex].topics[topicIndex]);
          return (
            <BookTree
              key={content.id}
              book={content}
              onItemPreviewClick={handleItem(handleTopicPreviewClick)}
              onItemEditClick={handleItem(onTopicEditClick)}
              onBookPreviewClick={onBookPreviewClick}
              onBookEditClick={
                isContentEditable?.(content) ? onBookEditClick : undefined
              }
              onLtiContextClick={searchProps.onLtiContextClick}
              isContentEditable={isContentEditable}
              onTreeChange={handleTreeChange}
            />
          );
        })}
      </TreeView>
      {loading && [...Array(5)].map((_, i) => <Skeleton key={i} height={40} />)}
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
      <SearchPagination
        className={classes.pagination}
        totalCount={totalCount}
      />
      {previewTopic && (
        <TopicPreviewDialog {...topicPreviewDialogProps} topic={previewTopic} />
      )}
    </Container>
  );
}
